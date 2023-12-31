const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());

const events = [];
app.post('/events', (req, res) => {
    events.push(req.body);

    axios.post('http://posts-clusterip-srv:4000/events', req.body).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://comments-clusterip-srv:4001/events', req.body).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://query-clusterip-srv:4002/events', req.body).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://moderation-clusterip-srv:4003/events', req.body).catch((err) => {
        console.log(err.message);
    });

    res.send({ status: 'OK' });
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('Listening on port http://localhost:4005');
})