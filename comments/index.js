const express = require('express');
const app = express();
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

app.use(express.json());
app.use(cors()); // allow all origins


const comments = {}; // {postId: [id, content, status]}

app.get('/posts/:postId/comments', (req, res) => {
    console.log(req.body);
    const postId = req.params.postId;
    res.send(comments[postId] || []);
})

app.post('/posts/:postId/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const postId = req.params.postId;
    if (!comments[postId]) {
        comments[postId] = [];
    }
    comments[postId].push({
        id: id,
        content: req.body.content,
        status: "pending"
    })

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: id,
            content: req.body.content,
            postId: postId,
            status: "pending"
        }
    });

    res.status(201).send(comments);
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === "CommentModerated") {
        const { id, content, postId, status } = data;
        const comment = comments[postId].find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id: id,
                content: content,
                postId: postId,
                status: status
            }
        })
    }
    console.log('Event Received: ', req.body.type);
    res.send({});
})


app.listen(4001, () => {
    console.log('Listening on port http://localhost:4001');
})