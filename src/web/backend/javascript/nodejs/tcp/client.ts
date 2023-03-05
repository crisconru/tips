import { Socket } from 'net'

const URL = process.env.TCP_SERVER_IP || '127.0.0.1'
const PORT = process.env.TCP_SERVER_PORT || 9876

const client = new Socket()
client.connect(Number(PORT), URL, () => {
  console.log('TCP CLIENT: connected')
  client.write(`Hello world ${new Date()}`)
})

client.on('data', (data: Buffer) => {
  console.log('TCP CLIENT: Received', data.toString('utf8'))
})

client.on('close', (hadError: boolean) => {
  console.log('TCP CLIENT: socket closed', new Date())
})
