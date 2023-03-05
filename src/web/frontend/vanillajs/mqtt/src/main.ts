import './style.css'
import { MQTTPayload, MQTTResponse } from './types'
import { connect, subscribe } from './mqtt'

const status = document.querySelector<HTMLSpanElement>('#status')


const onConnect = () => {
  console.log('connected')
  if (status) {
    status.innerHTML = 'connected'
  }
}

const onMessage = (msg: MQTTPayload, topic: string) => {
  console.log(`onMessage(${msg}, ${topic})`)
  if (status) {
    status.innerHTML = `topic = ${topic} | payload = ${msg}`
  }
}

const TOPIC = 'hola/mundo'

connect(onConnect)
subscribe(TOPIC, MQTTResponse.STRING, onMessage)

