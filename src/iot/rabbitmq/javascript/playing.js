const amqp = require('amqplib')

const sendAMQP = async (amqpMSG) => {
    try {
        // const amqp = global.get('amqplib')
        const HOST = 'amqp://192.168.0.37'
        const connection = await amqp.connect(HOST)
        const channel = await connection.createChannel()
        //const QUEUE = 'hello'
        //channel.sendToQueue(QUEUE, Buffer.from('something to do'))
        const { queue, body } = amqpMSG
        const sentResult = channel.sendToQueue(queue, Buffer.from(body))
        if (!sentResult) {
            await new Promise((resolve) => channel.once('drain', () => resolve));
        }
        await channel.close()
        await connection.close()
        // Send Node Msg
        return { payload: 'info enviada' }
    } catch (err) {
        return {
            payload: 'Error',
            error: String(err)
        }
    }
}

const msg = {
    queue: 'hello',
    body: 'prueba js'
}

sendAMQP(msg)
    .then(m => console.log(m))
    .catch(e => console.log(e))
