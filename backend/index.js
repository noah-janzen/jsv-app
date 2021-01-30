import Express from "express";
import Mongoose from 'mongoose';
import BodyParser from 'body-parser';
import { getNewsFeed, getNewsArticle, createNewsArticle, deleteNewsArticle } from "./database/functions/newsFunctions.js";
import { alterAttendanceResponse, createEvent, deleteEvent, getAttendanceResponseType, getEvent, getEventOverview } from "./database/functions/eventFunctions.js";
import { createThread, getChatOverview, getThread } from "./database/functions/threadFunctions.js";
import { createReply, deleteReply } from "./database/functions/replyFunctions.js";

// Server port.
const port = 3000;

// Connection string to connect to database.
const connectionString = "mongodb+srv://jsv-app-admin:jsvAppAdmin2021@mycluster.zrta6.mongodb.net/jsv-app?retryWrites=true&w=majority";

// Connect to the database.
Mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Get express server functionality.
const app = Express();

// Use body parser.
app.use(BodyParser.json());

// Base route.
app.get("/", (req, res) => {
    res.send("Base route of JSV app server, nothing to see here!");
})

// Get news feed overview.
app.get("/api/news", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Retrieve news feed and send it as response.
    res.send(await getNewsFeed());
})

// Get news article.
app.get("/api/news/:id", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Retrieve news article that has the specified id and send it as response.
    res.send(await getNewsArticle(req.params.id));
})

// Create news article.
app.post("/api/news/create", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Create new news article with the information specified in the request's body.
    var newNewsArticle = await createNewsArticle(req.body.title, req.body.content, req.body.image_uri);

    // Send created news article as JSON.
    res.send(newNewsArticle);
})

// Delete news article.
app.get("/api/news/delete/:id", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Delete news article that has the specified id.
    await deleteNewsArticle(req.params.id);
})

// Get event overview.
app.get("/api/events", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Retrieve events and send it as response.
    res.send(await getEventOverview());
})

// Get event.
app.get("/api/events/:id", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Retrieve event that has the specified id and send it as response.
    res.send(await getEvent(req.params.id));
})

// Create event.
app.post("/api/events/create", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Create new event.
    var newEvent = await createEvent(req.body.title, req.body.description, req.body.location, req.body.start_time, req.body.image_uri, req.body.is_public);

    // Return new event as JSON.
    res.send(newEvent);
})

// Delete event.
app.get("/api/events/delete/:id", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Delete event that has the specified id.
    await deleteEvent(req.params.id);
})

// Alter attendance response.
app.post("/api/events/:id/attendance", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    console.log(req.body);

    // Update attendance response of event with the information contained in the request's body.
    var updatedEvent = await alterAttendanceResponse(req.params.id,
        getAttendanceResponseType(req.body.attendance), getAttendanceResponseType(req.body.old_attendance));

    // Send updated event as JSON.
    res.send(updatedEvent);
})

// Get chat overview.
app.get("/api/chat", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Retrieve the chat threads and send them as response.
    res.send(await getChatOverview());
})

// Get thread.
app.get("/api/chat/:id", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Retrieve thread that has the specified id and send it as response.
    res.send(await getThread(req.params.id));
})

// Create thread.
app.post("/api/chat/create", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Create thread.
    var createdThread = await createThread(req.body.text);

    // Send created thread as JSON.
    res.send(createdThread);
})

// Delete thread.
app.get("/api/chat/delete/:id", async (req, res) => {
    // Delete thread that has the specified id.
    await deleteThread(req.params.id);
})

// Create reply.
app.post("/api/chat/reply/:id", async (req, res) => {
    // Set content type to application/json.
    res.type("json");

    // Create reply for thread in database.
    var createdReply = await createReply(req.params.id, req.body.reply_text);

    // Send created reply as JSON.
    res.send(createdReply);
})

// Delete reply.
app.get("/api/chat/reply/delete/:id", async (req, res) => {
    // Delete reply that has the specified id.
    await deleteReply(req.params.id);
})

// Start listening on port.
app.listen(port, () => {
    // Display a message to indicate start of listening process.
    console.log("JSV-App server started, listening on localhost:" + port);
})