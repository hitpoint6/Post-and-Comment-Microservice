const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const posts = {}; // '3be26afe': { id: '3be26afe', title: 'sdfds', comments: [ [Object] ] }

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = {
            id: id, title: title, comments: []
        }
    }
    if (type === "CommentCreated") {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({
            id: id,
            content: content,
            status: status,
        })
    }

    if (type === "CommentUpdated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);
        comment.status = status;
        comment.content = content;
        console.log('comment', comment);
    }

    console.log('Event Received: ', req.body.type);
    console.log(posts);
    res.send({});
})


app.listen(4002, () => {
    console.log("Listening on port http://localhost:4002");
})