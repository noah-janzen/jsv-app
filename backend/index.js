import Express from "express";
import Mongoose from 'mongoose';
import { GetNewsFeed, GetNewsArticle } from "./database/functions/newsFunctions.js";
import { GetEvent, GetEventOverview } from "./database/functions/eventFunctions.js";
import { GetChatOverview, GetThread } from "./database/functions/threadFunctions.js";

const app = Express();

// Server configuration.
const port = 3000;

// Database configuration.
const connectionString = "mongodb+srv://jsv-app-admin:jsvAppAdmin2021@mycluster.zrta6.mongodb.net/jsv-app?retryWrites=true&w=majority";

// Connect to the database.
Mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Base route.
app.get("/", (req, res) => {
    res.send("Base route of JSV app server, nothing to see here!");
})

// News feed overview.
app.get("/news-feed", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(await GetNewsFeed());
})

// News article.
app.get("/news-article/:id", async (req, res) => {
    res.send(await GetNewsArticle(req.params.id.toString()));
})

// Event overview.
app.get("/event-overview", async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(await GetEventOverview());
})

// Event.
app.get("/event/:id", async (req, res) => {
    res.send(await GetEvent(req.params.id.toString()));
})

// Chat overview.
app.get("/chat", async (req, res) => {
    res.send(await GetChatOverview());
})

// Thread.
app.get("/thread/:id", async (req, res) => {
    res.send(await GetThread(req.params.id.toString()));
})

// Start listening on port.
app.listen(port, () => {
    console.log("Server started, listening on localhost:" + port);
})