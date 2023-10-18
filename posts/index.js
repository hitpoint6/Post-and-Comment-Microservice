const express = require('express');
const app = express();
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

app.use(express.json());
app.use(cors()); // allow all origins


const posts = []; // 

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    posts.push({
        id: id,
        title: req.body.title
    })

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id: id,
            title: req.body.title
        }
    });

    res.status(201).send(posts[id]);
})

app.post('/events', (req, res) => {
    console.log('Event Received: ', req.body.type);
    res.send({});
})

app.listen(4000, () => {
    console.log("V20");
    console.log('Listening on port http://localhost:4000');
})