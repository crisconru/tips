import sys
from pika import BlockingConnection, ConnectionParameters

params = ConnectionParameters(host='localhost')
connection = BlockingConnection(params)
channel = connection.channel()

channel.exchange_declare(exchange='logs', exchange_type='fanout')

message = ' '.join(sys.argv[1:]) or "info: Hello World!"
channel.basic_publish(exchange='logs', routing_key='', body=message)
print(" [x] Sent %r" % message)

connection.close()
