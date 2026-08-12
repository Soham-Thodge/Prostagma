import { kafka } from "./kafka.client.js";

import {
    onExpenseCreated
} from "./handlers/index.js";
import { Topics } from "./kafka.topics.js";

const consumer = kafka.consumer({
    groupId: "user-service"
});

export async function startConsumer(){
    await consumer.connect();

    await consumer.subscribe({
        topics: [
            Topics.EXPENSE_CREATED,
            Topics.EXPENSE_DELETED,
            Topics.EXPENSE_UPDATED
        ],
        fromBeginning: false
    })

    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            try{
                const event = JSON.parse(message.value?.toString() ?? "{}");

                switch(topic){
                    case Topics.EXPENSE_CREATED:
                        await onExpenseCreated(event);
                        break;
                }
            }catch(error){
                
            }
        }
    })
}