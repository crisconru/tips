import {
  Client,
  OnSuccessCallback,
  Message
} from 'paho-mqtt'
import { MessageCallback, MQTTDispatch, MQTTInfo, MQTTPayload, MQTTResponse } from './types'

const HOST = '192.168.0.254'
const PORT = 1884
const CLIENT_ID = 'Frontend'
const USER = 'user'
const PASS = 'passwd'

const dispatch: MQTTDispatch = new Map()

const client = new Client(HOST, PORT, CLIENT_ID)

let connectedCallback: OnSuccessCallback

const _onConnect = () => {
  console.log('MQTT: connected')
  for (let [topic, _] of dispatch) {
    client.subscribe(topic)
    console.log(`MQTT: subscribed to ${topic}`)
  }
  connectedCallback()
}

const _onMessage = (message: Message) => {
  console.log(`MQTT: onMessage`)
  const topic = message.destinationName
  if (dispatch.has(topic)) {
    console.log(`MQTT: topic = ${topic}`)
    const mqttInfo = dispatch.get(topic)
    const payload = (mqttInfo?.type === MQTTResponse.BYTES) ? message.payloadBytes : message.payloadString
    mqttInfo?.callback(payload, topic)
  }
}

export const connect = (onConnect: OnSuccessCallback) => {
  connectedCallback = onConnect
  client.connect({
    userName: USER,
    password: PASS,
    onSuccess: _onConnect
  })
}

export const subscribe = (topic: string, type: MQTTResponse, callback: MessageCallback) => {
  if (dispatch.has(topic)) {
    client.unsubscribe(topic)
    console.log(`MQTT: unsubscribe from ${topic}`)
  } 
  const mqttInfo: MQTTInfo = { type, callback }
  dispatch.set(topic, mqttInfo)
}

client.onMessageArrived = _onMessage

export const publish = (topic: string, payload: MQTTPayload) => {
  const message = new Message(payload)
  message.destinationName = topic
  // client.publish(topic, payload)
  client.send(message)
}