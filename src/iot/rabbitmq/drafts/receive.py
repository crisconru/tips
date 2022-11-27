import os
import sys
from pika import (
    BlockingConnection, ConnectionParameters
)

BROKER = 'localhost'
QUEUE = 'hello'
BODY = 'hola holita vecinito'


def main():
    params = ConnectionParameters(BROKER)
    connection = BlockingConnection(params)
    channel = connection.channel()

    channel.queue_declare(queue=QUEUE)

    def callback(ch, method, properties, body):
        print('Mensaje recibido\n')
        print(ch)
        print()
        print(method)
        print()
        print(properties)
        print()
        print(body)

    channel.basic_consume(
        queue=QUEUE,
        on_message_callback=callback,
        auto_ack=True
    )

    print('Esperando mensajes')
    channel.start_consuming()


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('\nInterrumpido por teclado')
    except Exception as err:
        print('\nInterrumpido')
        print(err)
    finally:
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)
