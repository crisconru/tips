from typing import Union, Optional, List
from datetime import datetime

import pifacedigitalio as pf

MIN_PIN = 0
MAX_PIN = 7
NUMBER_OF_PINS = 9
LOW = 0
LOW_PIN_VALUES = ['0', 'low', 'close', 'red', 'down']
HIGH = 1
HIGH_PIN_VALUES = ['1', 'high', 'open', 'green', 'up']


def is_correct_pin(pin: int) -> bool:
    if pin is not None and MIN_PIN <= pin <= MAX_PIN:
        return True
    return False


def is_correct_value(value: int) -> bool:
    if value is not None and value in [LOW, HIGH]:
        return True
    return False


def mqtt_value_to_pin_value(value: Union[str, int]) -> Optional[int]:
    if isinstance(value, str):
        v = value.lower()
        if v in LOW_PIN_VALUES:
            return LOW
        elif v in HIGH_PIN_VALUES:
            return HIGH
    elif isinstance(value, int):
        if value <= 0:
            return LOW
        elif 0 < value:
            return HIGH
    return None


class PiFace:
    def __init__(
        self,
        address: int,
        inputs_topics_sub = [''] * NUMBER_OF_PINS,
        inputs_topics_pub = [''] * NUMBER_OF_PINS,
        outputs_topics_sub = [''] * NUMBER_OF_PINS,
        outputs_topics_pub = [''] * NUMBER_OF_PINS
    ) -> None:
        self.piface = None
        self.address = address
        self.inputs_value: List[Optional[str]] = [None] * 8
        self.inputs_topics_sub = inputs_topics_sub
        self.inputs_topics_pub = inputs_topics_pub
        self.outputs_topics_sub = outputs_topics_sub
        self.outputs_topics_pub = outputs_topics_pub

    def open(self) -> bool:
        try:
            return self.__check_address() if self.piface is None else True
        except Exception as err:
            print(f'PiFaceError connecting to PiFace\nError = {err}')
        print('PiFace cannot be opened')
        return False

    def __check_address(self):
        print(f'Checking address {self.address}')
        if self.address is not None:
            try:
                self.piface = pf.PiFaceDigital(self.address)
                print(f'Reading pin 1 into board {self.address}')
                self.read_pin(1)
                print(f'PiFace connected at {self.address} address')
                return True
            except (pf.core.NoPiFaceDigitalError, Exception) as err:
                print(
                    f'PiFaceError no board in hw_address {self.address}\n'
                    f'Error = {err}'
                )
        return False
    ''' INPUTS '''
    def is_input_topic(self, topic: str) -> bool:
        if topic is not None and topic != '':
            return True if topic in self.inputs_topics_sub else False
        return False

    def __pin_from_input_topic(self, topic: str) -> int:
        return self.inputs_topics_sub.index(topic) \
            if self.is_input_topic(topic) else -1

    def read_pin(self, pin: int) -> str:
        if self.open() and is_correct_pin(pin):
            try:
                return str(self.piface.input_pins[pin].value)
            except Exception as err:
                print(f'PiFaceError reading pin {pin}\nError = {err}')
        return ''

    def read_input(self, topic: str) -> dict:
        msg = {}
        if self.is_input_topic(topic):
            pin = self.inputs_topics_sub.index(topic)
            if is_correct_pin(pin):
                try:
                    value = self.read_pin(pin)
                    msg = {
                        'topic': self.inputs_topics_pub[pin],
                        'payload': {
                            'state': str(value),
                            'time': str(datetime.now())
                        }
                    }
                except Exception as err:
                    print(
                        f'PiFace error reading {pin} of topic {topic}\n'
                        f'Error = {err}'
                    )
        return msg

    def read_inputs(self) -> list:
        response = []
        for topic in self.inputs_topics_sub:
            if topic is not None:
                msg = self.read_input(topic)
                if msg:
                    pin = self.__pin_from_input_topic(topic)
                    value = msg['payload']['state']
                    if self.inputs_value[pin] != value:
                        self.inputs_value[pin] = value
                        print(f'PiFace {self.address} - Input {pin} = {value}')
                        response.append(msg)
        return response
    ''' OUTPUTS '''
    def is_output_topic(self, topic: str) -> bool:
        return True if topic in self.outputs_topics_sub else False

    def write_pin(self, pin: int, value: int) -> bool:
        if self.open() and is_correct_pin(pin) and is_correct_value(value):
            try:
                self.piface.output_pins[pin].value = value
                print(f'PiFace {self.address} - pin {pin} = {value}')
                return True
            except Exception as err:
                print(
                    f'PiFaceError cannot write board {self.address}'
                    f' pin {pin} to {value}\nError = {err}'
                )
        return False

    def write_output(self, topic: str, value: Union[int, str]) -> dict:
        msg = {}
        try:
            pin = self.outputs_topics_sub.index(topic)
            v = mqtt_value_to_pin_value(value)
            if v is not None and self.write_pin(pin, v):
                msg = {
                    'topic': self.outputs_topics_pub[pin],
                    'payload': {
                        'state': str(v),
                        'time': str(datetime.now())
                    }
                }
        except (ValueError, Exception) as err:
            print(
                f'PiFace error writing {value} of topic {topic}\nError = {err}'
            )
        return msg
