const moment = require('moment');

const events = [
    {
        id: 1,
        title: "Learning TypeScript",
        start: new Date(),
        end: new Date(moment().add(1, 'days').add(5, 'hours').format()),
        allDay: false,
        type: 'fun'
    },
    {
        id: 2,
        title: "Calendar Works!",
        start: new Date(moment().add(5, 'days').format()),
        end: new Date(moment().add(5, 'days').add(5, 'hours').format()),
        allDay: false,
        type: 'work'
    },
    {
        id: 3,
        title: "I love TypeScript (:",
        start: new Date(moment().add(9, 'days').format()),
        end: new Date(moment().add(9, 'days').add(5, 'hours').format()),
        allDay: false,
        type: 'fun'
    },
    {
        id: 4,
        title: "Test",
        start: new Date(moment().add(2, 'days').format()),
        end: new Date(moment().add(3, 'days').add(5, 'hours').format()),
        allDay: false,
        type: 'serious'
    },
]

module.exports = {
    events
}