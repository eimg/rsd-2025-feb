const express = require("express");
const app = express();

app.get("/posts", (req, res) => {
    const data = [
        { id: 2, content: "Some Content", date: new Date() },
        { id: 1, content: "More Content", date: new Date() },
    ];
    res.json(data);
});

app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    res.json({ msg: `Single Pose - ${id}` });
});

app.listen(8080, () => {
    console.log("Api running at 8080...");
});
