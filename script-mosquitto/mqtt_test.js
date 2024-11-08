const mqtt = require('mqtt');

// Connect to the MQTT broker
const client = mqtt.connect('mqtt://172.20.10.8:1883');

// When the client connects
client.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to a test topic
  const topic = 'test/topic';
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${topic}`);

      // Publish a test message to the same topic
      client.publish(topic, 'Hello, MQTT from Node.js!');
      client.publish(topic, 'Hello, MQTT from node with ip address');

      console.log('Message published');
    } else {
      console.error('Subscription error:', err);
    }
  });
});

// When a message is received
client.on('message', (topic, message) => {
  console.log(`Message received on topic '${topic}': ${message.toString()}`);
});

// Handle errors
client.on('error', (err) => {
  console.error('Connection error:', err);
});

// Close the client after a delay (optional)
setTimeout(() => {
  client.end();
  console.log('Disconnected from MQTT broker');
}, 5000);
