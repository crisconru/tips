import pifacedigitalio as p
from time import sleep

try:
    p.init()

    while True:
        # p.digital_write(0, 1)    # writes pin0 high
        # p.digital_write(5, 1, 2) # writes pin5 on board2 high
        print('----------------------')
        for placa in range (0,1):
            for pin in range(0, 8):
                print(f'Placa {placa} - PIN {pin} = {p.digital_read(pin, placa)}')
        print('\n')
        sleep(2)
        # p.digital_read(4)        # reads pin4 (on board0)
        # p.digital_read(2, 3)     # reads pin2 (on board3)
except Exception as e:
    print(f'error = {e}')
finally:
    p.deinit()
