import sys
from time import sleep
from pathlib import Path
from json import dumps, loads
from datetime import datetime

import yaml
import paho.mqtt.client as mqtt
from paho.mqtt.client import MQTTMessage

from PyFace.raspberry import Raspberry as RPi

''' CONFIG '''
file = 'config.yml'

if len(sys.argv) > 1:
    tmp_file = Path(__file__).resolve().parents[0] / sys.argv[-1]
    if tmp_file.is_file():
        file = tmp_file
    
config_file = Path(__file__).resolve().parents[0] / file
config = {}
with open(config_file, 'r') as f:
    config = yaml.load(f, Loader=yaml.FullLoader)

''' RPi - PiFaces '''
DEBOUNCE = config.get('debounce', 2.0)
t_start = datetime.now()

print(f'Debounce = {DEBOUNCE}')
PIFACES = config.get('boards', [])
rpi = RPi(PIFACES)


def on_connect(client, userdata, flags, rc):
    global flag_connected
    flag_connected = True
    print(f'Connected with result code {rc}')
    boards = rpi.number_of_boards()
    if boards:
        print(f'Raspberry has {boards} boards connected')
        client.subscribe("#")
        # reading_inputs()
    else:
        print('Raspberry no has boards')
        client.disconnect()


def reading_inputs():
    global t_start, flag_connected
    while True:
        if (
            flag_connected and 
            (datetime.now() - t_start).total_seconds() > DEBOUNCE
        ):
            t_start = datetime.now()
            for i in rpi.read_inputs():
                # print(f'Entrada {i}')
                if i:
                    topic = i.get('topic', None)
                    payload = i.get('payload', None)
                    if (
                        (topic and topic != '') and 
                        (payload and isinstance(payload, dict))
                    ):
                        try:
                            p = dumps(payload)
                            client.publish(topic=topic, payload=p)
                            print(f'Published at {topic} {p}')
                        except Exception as err:
                            print(
                                f'Cannot publish to topic = {topic}\n'
                                f'\tPayload = {payload}\n'
                                f'\tError {err}'
                            )

'''
def on_publish(client: mqtt, userdata, mid):
    print(f'Publicado con {mid}')
'''
# The callback for when a PUBLISH message is received from the server.
def on_message(client: mqtt, userdata, msg: MQTTMessage):
    print(msg.topic + " " + str(msg.payload))
    try:
        topic = msg.topic
        str_payload = msg.payload.decode()
        value = loads(msg.payload.decode()).get('state', None) \
            if str_payload != '' else None
        if topic:
            response_msg = rpi.process_message(topic, value)
            if response_msg:
                topic = response_msg.get('topic', None)
                payload = response_msg.get('payload', None)
                if topic is not None and payload is not None:
                    client.publish(topic=topic, payload=dumps(payload))
    except Exception as err:
        print(f'MQTT Error = {err}')


def on_disconnect(client: mqtt, userdata, rc):
    global flag_connected
    flag_connected = False
    print('MQTT disconectted')

''' MQTT '''
MQTT: dict = config.get('mqtt')
MQTT_BROKER: str = MQTT.get('broker', '192.168.0.26')
MQTT_PORT: int = MQTT.get('port', 1883)
flag_connected = False
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
# client.on_publish = on_publish
client.on_disconnect = on_disconnect
client.connect(MQTT_BROKER, MQTT_PORT, 60)
''' RUNNING '''
try:
    # client.loop_forever()
    client.loop_start()
    reading_inputs()
except Exception as err:
    print(f'Error = {err}')
except KeyboardInterrupt:
    print(f'Stopped programa manually')
finally:
    client.loop_stop()
    print(f'Disconnecting MQTT')
    client.disconnect()
