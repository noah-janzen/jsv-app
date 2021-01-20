import Express from "express";
import { NewsFeed, NewsArticle } from "./functions/news.js"
import { EventOverview, Event } from "./functions/events.js"
import { Chat, Thread } from "./functions/chat.js"

const app = Express()
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!")
})

// News feed overview
app.get("/news-feed", (req, res) => {
    res.send(NewsFeed())
})

// News article
app.get("/news-article/id=:id", (req, res) => {
    res.send(NewsArticle())
})

// Event overview
app.get("/event-overview", (req, res) => {
    res.send(EventOverview())
})

// Event
app.get("/event/id=:id", (req, res) => {
    res.send(Event())
})

// Chat overview
app.get("/chat", (req, res) => {
    res.send(Chat())
})

// Thread
app.get("/thread/id=:id", (req, res) => {
    res.send(Thread())
})
app.listen(port, () => {
    console.log("Listening on localhost:" + port)
})