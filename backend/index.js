import Express from "express";
import Mongoose from 'mongoose';
import BodyParser from 'body-parser';
import { GetNewsFeed, GetNewsArticle } from "./database/functions/newsFunctions.js";
import { AlterAttendanceResponse, GetAttendanceResponseType, GetEvent, GetEventOverview } from "./database/functions/eventFunctions.js";
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

// Alter attendance response.
app.get("/api/events/attendance", async (req, res) => {
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

// Create reply.
app.post("/api/chat/reply/:id", async (req, res) => {
    res.type("json");

    // Create reply for thread in database.
    var createdReply = await CreateReply(req.params.id.toString(), req.body.reply_text);

    // Send created reply as JSON.
    res.send(createdReply);
})

// Start listening on port.
app.listen(port, () => {
    console.log("Server started, listening on localhost:" + port);
})