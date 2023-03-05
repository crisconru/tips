export type MQTTPayload = string | ArrayBuffer

export type MessageCallback = (msg: MQTTPayload, topic: string) => void

export enum MQTTResponse {
    BYTES = 'bytes',
    STRING = 'string'
}

export interface MQTTInfo {
    type: MQTTResponse,
    callback: MessageCallback
}

export type MQTTDispatch = Map<string, MQTTInfo>