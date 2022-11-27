from pika import (
    BlockingConnection, ConnectionParameters
)

BROKER = 'localhost'
QUEUE = 'hello'
BODY = 'hola holita vecinito'

params = ConnectionParameters(BROKER)
connection = BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue=QUEUE)
channel.basic_publish(
    exchange='',
    routing_key=QUEUE,
    body=BODY
)
print('Mensaje enviado a la cola')

connection.close()
