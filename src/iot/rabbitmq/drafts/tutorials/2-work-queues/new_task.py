import sys
from pika import BlockingConnection, ConnectionParameters, BasicProperties
from pika.spec import PERSISTENT_DELIVERY_MODE

params = ConnectionParameters(host='localhost')
connection = BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='task_queue', durable=True)

message = ' '.join(sys.argv[1:]) or "Hello World!"

channel.basic_publish(
    exchange='',
    routing_key='task_queue',
    body=message,
    properties=BasicProperties(
        delivery_mode=PERSISTENT_DELIVERY_MODE,
    ))

print(f' [x] Sent {message}')

connection.close()
