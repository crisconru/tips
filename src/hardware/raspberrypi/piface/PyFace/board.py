from typing import Tuple

import pifacedigitalio as piface

MAX_ADDRESS = 4
MIN_PIN = 0
MAX_PIN = 7
LOW = 0
HIGH = 1

class Board:
    def __init__(self, address = 0) -> None:
        self.piface = None
        self.address = address

    def open(self):
        print('PiFace open()')
        try:
            if self.piface is None:
                self.piface = piface.init()
            if self.piface is not None:
                return self.check_address()
        except Exception as err:
            print(f'PiFaceError connecting to PiFace\nError = {err}')
        print('PiFace cannot be opened')
        return False

    def close(self):
        try:
            if self.piface is not None:
                self.piface.deinit()
        except Exception as err:
            print(f'PiFaceError closing connection\nError = {err}')

    def check_address(self):
        if self.open():
            addresses = []
            for i in range(0, MAX_ADDRESS):
                print('Checking address')
                try:
                    print(f'Reading pin 1 into board {i}')
                    self.piface.digital_read(1, i)
                    addresses.append(i)
                    print('Pin readed')
                except (piface.core.NoPifFaceDigitalError, Exception) as err:
                    print(
                        f'PiFaceError no board in hw_address {i}'
                        f'\nError = {err}'
                    )
            if len(addresses) > 0:
                self.address = self.address if self.address in addresses \
                    else addresses[0]
                return True
        print(f"PiFaceError no board, close program")
        self.close()
        return False

    def read_pin(self, pin: int) -> str:
        if self.correct_pin(pin) and self.open():
            try:
                return str(self.piface.digital_read(pin, self.address))
            except Exception as err:
                print(f'PiFaceError reading pin {pin}\nError = {err}')
        return ''

    def write_pin(self, pin: int, value: int) -> bool:
        if self.correct_pin(pin) and self.correct_value(value) and self.open():
            try:
                self.piface.digital_write(pin, value, self.address)
                return True
            except Exception as err:
                print(
                    f'PiFaceError cannot write board {self.address}'
                    f' pin {pin} to {value}\nError = {err}'
                )
        return False

    def correct_pin(self, pin: int) -> bool:
        return True if MIN_PIN <= pin <= MAX_PIN else False

    def correct_value(self, value: int) -> bool:
        return True if value in [LOW, HIGH] else False

