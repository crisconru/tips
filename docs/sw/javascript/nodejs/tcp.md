# TCP

TCP no se puede usar como tal en VanillaJS, ya que en frontend solo se puede
usar HTTP y WebSockets. Por eso hay que usar un runtime como NodeJS o Deno o Bun.

## Servidor

Hay que usar el modulo `net` del core de Node.

1. Se crea el servidor con `createServer`
2. Para gestionar los clientes / conexiones / sockets, la lógica se puede pasar por:
    - `createServer`
    - A través de una callback con el evento `on('connection')`
3. El cliente / conexión / socket es del tipo `net.Socket` y se gestiona con eventos:
    - `data` es cuando recibe datos.
    - `close` es cuando se ha cerrado la conexión.
    - `error` es cuando ha habido un error.
4. El servidor también se gestiona con eventos:
    - `connection` es opcional, en el sentido de que puede ir dentro de `createServer`.
    - `close` cuando se cierra el servidor.
5. Para iniciar el servidor hay que usar la función `listen`.

=== "Conexión en `createServer`"

    ``` javascript
    import { createServer, Socket } from 'net'
    const PORT = process.env.TCP_SERVER_PORT || 9876
    // Server + Connection
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
    // Server closed
    server.on('close', () => console.error('TCP SERVER: closed connection at', new Date()))
    // Start server
    server.listen(PORT, () => console.log('TCP SERVER: listening on', server.address()))
    ```

=== "Conexión en `.on('connection')`"

    ``` javascript
    import { createServer, Socket } from 'net'
    const PORT = process.env.TCP_SERVER_PORT || 9876
    // Connection logic
    const handleConnection = (client: Socket) => {
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
    }
    // Server + Connection + Close
    const server = createServer()
    server.on('connection', handleConnection)
    server.on('close', () => console.error('TCP SERVER: closed connection at', new Date()))
    // Start server
    server.listen(PORT, () => console.log('TCP SERVER: listening on', server.address()))
    ```

## Cliente

El cliente / conexión / socket usa la clase `net.Socket`. Una vez se inicia con
la función `connect`, se gestiona a través de eventos:

- `data` es cuando recibe datos.
- `close` es cuando se ha cerrado la conexión.
- `error` es cuando ha habido un error.

``` javascript
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
```
