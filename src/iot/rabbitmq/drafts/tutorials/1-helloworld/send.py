from pika import BlockingConnection, ConnectionParameters

params = ConnectionParameters(host='localhost')
connection = BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='hello')

channel.basic_publish(exchange='', routing_key='hello', body='Hello World!')

print(" [x] Sent 'Hello World!'")

connection.close()
