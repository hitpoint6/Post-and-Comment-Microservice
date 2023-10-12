const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.json());


app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    console.log(type);

    if (type === "CommentCreated") {
        const message = data;

        if (message.content.includes("orange")) {
            message.status = "rejected";
        } else {
            message.status = "approved";
        }

        await axios.post("http://localhost:4005/events", {
            type: 'CommentModerated',
            data: message
        }).catch(err => {
            console.log(err.message);
        })
    }

    res.send({});

})


app.listen(4003, () => {
    console.log("Listening on port http://localhost:4003")
})