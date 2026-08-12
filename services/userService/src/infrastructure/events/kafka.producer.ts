import { kafka } from "./kafka.client.js";
import type { User } from "../../domain/user.entity.js";


const producer = kafka.producer();

export const connectProducer = async () => {
    await producer.connect();
}

export const publish = async (topic: string, payload: unknown) => {
    producer.send({
        topic,
        messages: [{ value: JSON.stringify(payload) }]
    })
}