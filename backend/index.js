import Express from "express";
import ReadJsonFile from "./functions/readJsonFile.js"

const app = Express()
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!")
})

// News feed overview
app.get("/news-feed", (req, res) => {
    res.send(ReadJsonFile("./json/news-feed.json"))
})

// News article
app.get("/news-article/id=:id", (req, res) => {
    res.send(ReadJsonFile("./json/news-article.json"))
})

// Event overview
app.get("/event-overview", (req, res) => {
    res.send(ReadJsonFile("./json/event-overview.json"))
})

// Event
app.get("/event/id=:id", (req, res) => {
    res.send(ReadJsonFile("./json/event.json"))
})

// Chat overview
app.get("/chat", (req, res) => {
    res.send(ReadJsonFile("./json/chat.json"))
})

// Thread
app.get("/thread/id=:id", (req, res) => {
    res.send(ReadJsonFile("./json/thread.json"))
})

app.listen(port, () => {
    console.log("Listening on localhost:" + port)
})