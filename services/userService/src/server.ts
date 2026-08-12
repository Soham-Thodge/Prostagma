import app from "./app.js";
import { connectRedis } from "./infrastructure/cache/redisClient.js";
import { connectDB } from "./infrastructure/database/mongoClient.js";
import { startConsumer } from "./infrastructure/events/kafka.consumer.js";
import { connectProducer } from "./infrastructure/events/kafka.producer.js";

const start = async () => {
    connectDB();
    // connectRedis();
    // connectProducer();
    // startConsumer();

    app.listen(4001, () => {
        console.log("User Service is running on 4001")
    })
}

start();