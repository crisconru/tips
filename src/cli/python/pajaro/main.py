from time import sleep
from pynput.keyboard import Key, Controller

keyboard = Controller()


try:
    # Press and release space
    while True:
      keyboard.press(Key.cmd)
      sleep(20)
      keyboard.release(Key.cmd)
except Exception:
    pass
