const express = require('express');
const events = require('./data');
const app = express();

app.get('/api/getEvents', (req, res) => {
    res.status(200).send(events);
})

app.post('/api/changeTime', (req, res) => {
    const { id, start, end } = req.body;

    let index = events.findIndex(event => event.id === id);
    events[index].start = start;
    events[index].end = end;
    res.status(200).send(events);
})

app.listen(5656, () => console.log(`listening at 5656`));