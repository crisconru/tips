import { createServer, Socket } from 'net'
const PORT = process.env.TCP_SERVER_PORT || 9876
/*
const server = createServer((client: Socket) => {
  const remoteAddress = `${client.remoteAddress}:${client.remotePort}`
  console.log(`TCP SERVER: new client connection from ${remoteAddress}`)

  client.on('data', (data: Buffer) => {
    console.log(`TCP SERVER: connection data from ${remoteAddress}: ${data}`)
    client.write('TCP: SERVER: Received\n')
    client.write(data)
  })

  client.once('close', (hadError: boolean) => {
    console.log(`TCP SERVER: connection from ${remoteAddress} closed`)
  })
  
  client.on('error', (error: Error) => {
    console.log(`TCP SERVER: Connection ${remoteAddress} error: ${error.message}`)
  })
})
*/
const handleConnection = (client: Socket) => {
  const remoteAddress = `${client.remoteAddress}:${client.remotePort}`
  console.log(`TCP SERVER: new client connection from ${remoteAddress}`)

  client.on('data', (data: Buffer) => {
    console.log(`TCP SERVER: connection data from ${remoteAddress}: ${data}`)
    client.write('TCP: SERVER: Received\n')
    client.write(data)
  })

  client.once('close', (hadError: boolean) => {
    console.log(`connection from ${remoteAddress} closed`)
  })
  
  client.on('error', (error: Error) => {
    console.log(`Connection ${remoteAddress} error: ${error.message}`)
  })
}

const server = createServer()
server.on('connection', handleConnection)

server.on('close', () => console.error('TCP SERVER: closed connection at', new Date()))
server.listen(PORT, () => console.log('TCP SERVER: listening on', server.address()))