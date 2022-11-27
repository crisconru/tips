import time
from pynput.keyboard import Key, Controller


teclado = Controller()

veces = 0

#for i in range(2):
try:
    while True:
        teclado.press(Key.cmd)
        teclado.release(Key.cmd)
        time.sleep(20)
        # veces = veces + 1
except KeyboardInterrupt:
    print('\nlo has parado por el teclado')

print('ehto eh to hamijos')
