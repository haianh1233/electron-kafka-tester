const express = require('express');
const { Kafka } = require('kafkajs');

const app = express();
const port = 3000;

app.use(express.json());

const { exec } = require('child_process');

app.post('/run-jar', async (req, res) => {
    exec('java -jar kafka-electron-test-backend/target/kafka-electron-test-backend-1.0-SNAPSHOT.jar', (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing JAR:', error);
            return res.status(500).send('Error running JAR');
        }
        console.log('JAR Output:', stdout);
        res.status(200).send('JAR executed successfully');
    });
});

app.post('/health', async (req, res) => {
    const { brokers } = req.body;

    if (!brokers || !Array.isArray(brokers) || brokers.length === 0) {
        return res.status(400).send('Invalid brokers array');
    }

    const kafka = new Kafka({
        clientId: 'electron-app',
        brokers,
    });

    const producer = kafka.producer();
    const consumer = kafka.consumer({ groupId: 'electron-group' });

    try {
        await producer.connect();
        await producer.disconnect();

        await consumer.connect();
        await consumer.disconnect();

        res.status(200).send('Kafka is healthy');
    } catch (error) {
        console.error('Kafka health check failed:', error);
        res.status(500).send('Kafka is not healthy');
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
