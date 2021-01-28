import Express from "express";
import Mongoose from 'mongoose';
import BodyParser from 'body-parser';
import { GetNewsFeed, GetNewsArticle, CreateNewsArticle, DeleteNewsArticle } from "./database/functions/newsFunctions.js";
import { AlterAttendanceResponse, CreateEvent, DeleteEvent, GetAttendanceResponseType, GetEvent, GetEventOverview } from "./database/functions/eventFunctions.js";
import { CreateThread, GetChatOverview, GetThread } from "./database/functions/threadFunctions.js";
import { CreateReply } from "./database/functions/replyFunctions.js";

const app = Express();

// Server configuration.
const port = 3000;
// Database configuration.
const connectionString = "mongodb+srv://jsv-app-admin:jsvAppAdmin2021@mycluster.zrta6.mongodb.net/jsv-app?retryWrites=true&w=majority";

// Connect to the database.
Mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Use body parser.
app.use(BodyParser.json());

// Base route.
app.get("/", (req, res) => {
    res.send("Base route of JSV app server, nothing to see here!");
})

// Get news feed overview.
app.get("/api/news", async (req, res) => {
    res.type("json");
    res.send(await GetNewsFeed());
})

// Get news article.
app.get("/api/news/:id", async (req, res) => {
    res.type("json");
    res.send(await GetNewsArticle(req.params.id.toString()));
})

// Create news article.
app.post("/api/news/create", async (req, res) => {
    res.type("json");

    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.image_uri);

    // Create new news article.
    var newNewsArticle = await CreateNewsArticle(req.body.title, req.body.content, req.body.image_uri);

    // Send created news article as JSON.
    res.send(newNewsArticle);
})

// Delete news article.
app.get("/api/news/delete/:id", async (req, res) => {
    res.type("json");

    // Delete news article that has the given id.
    await DeleteNewsArticle(req.params.id.toString());
})

// Get event overview.
app.get("/api/events", async (req, res) => {
    res.type("json");
    res.send(await GetEventOverview());
})

// Get event.
app.get("/api/events/:id", async (req, res) => {
    res.type("json");
    res.send(await GetEvent(req.params.id.toString()));
})

// Create event.
app.post("/api/events/create", async (req, res) => {
    res.type("json");

    // Create new event.
    var newEvent = await CreateEvent(req.body.title, req.body.description, req.body.location, req.body.start_time, req.body.image_uri, req.body.is_public);

    // Return new event as JSON.
    res.send(newEvent);
})

// Delete event.
app.get("/api/events/delete/:id", async (req, res) => {
    res.type("json");

    // Delete event with specified id.
    await DeleteEvent(req.params.id.toString());
})

// Alter attendance response.
app.post("/api/events/attendance", async (req, res) => {
    res.type("json");

    // Update attendance response of event.
    var updatedEvent = await AlterAttendanceResponse(req.body.event_id,
        GetAttendanceResponseType(req.body.attendance), GetAttendanceResponseType(req.body.old_attendance));

    // Send updated event as JSON.
    res.send(updatedEvent);
})

// Get chat overview.
app.get("/api/chat", async (req, res) => {
    res.type("json");
    res.send(await GetChatOverview());
})

// Get thread.
app.get("/api/chat/:id", async (req, res) => {
    res.type("json");
    res.send(await GetThread(req.params.id.toString()));
})

// Create thread.
app.post("/api/chat/create", async (req, res) => {
    res.type("json");

    // Create thread.
    var createdThread = await CreateThread(req.body.text);

    // Send created thread as JSON.
    res.send(createdThread);
})

// Delete thread.
app.get("/api/chat/delete/:id", async (req, res) => {
    res.type("json");

    // Delete thread with specified id.
    await DeleteThread(req.params.id.toString());
})

// Create reply.
app.post("/api/chat/reply/:id", async (req, res) => {
    res.type("json");

    // Create reply for thread in database.
    var createdReply = await CreateReply(req.params.id.toString(), req.body.reply_text);

    // Send created reply as JSON.
    res.send(createdReply);
})

// Delete reply.
app.get("/api/chat/reply/delete/:id", async (req, res) => {
    res.type("json");

    // Delete reply with specified id.
    await DeleteReply(req.params.id.toString());
})

// Start listening on port.
app.listen(port, () => {
    console.log("Server started, listening on localhost:" + port);
})