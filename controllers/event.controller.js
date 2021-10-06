let events = [
    { id: 1, title: "Event 1", date: "2021-10-01" },
    { id: 2, title: "Event 2", date: "2021-10-15" }
];

const incrementId = function () {
    // let id = events[events.length -1].id
    let { id } = events[events.length - 1];
    id += 1;
    return id;
}

module.exports = {
    showAll: (req, res) => {
        res.render("events", { events });
    },
    showCreateEvent: (req, res) => {
        res.render("form");
    },
    createEvent: (req, res) => {
        const { title, date } = req.body;
        events.push({ id: incrementId(), title, date });
        res.redirect("/event");
    },
    deleteEvent: (req, res) => {
        const { id } = req.params;
        console.log("here i am")
        const index = events.findIndex((el) => { return el.id == id });
        events.splice(index,1);
        res.json(events);
    }
}