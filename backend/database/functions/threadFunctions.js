import Mongoose from 'mongoose';
import threadSchema from '../schemas/threadSchema.js'

const Thread = Mongoose.model("Thread", threadSchema);

export async function GetChatOverview() {
    return await Thread.find({})
        .then(function (foundThreads) {
            // Construct array of threads.
            var threads = [];
            foundThreads.forEach(function (thread) {
                threads.push({
                    id: thread._id,
                    text_snippet: thread.message,
                    date: thread.date,
                    number_of_answers: thread.responses.length
                });
            });

            // Return threads as JSON.
            return JSON.stringify({ threadListItems: threads });
        })
        .catch(function (err) {
            console.log("GetChatOverview failed: " + err);
            return "";
        });
}

export async function CreateThread(message) {
    return await Thread.create({
        message: message
    })
        .then(function (createdThread) {
            console.log("Successfully created thread with id " + createdThread._id);

            return JSON.stringify({
                id: createdThread._id,
                text: createdThread.message,
                date: createdThread.date,
                number_of_answers: 0,
                responses: createdThread.responses
            });
        })
        .catch(function (err) {
            console.log("CreateThread failed: " + err);
            return "";
        });
}

export async function DeleteThread(id) {
    return await Thread.deleteOne({ _id: id }, {})
        .then(() => console.log("Thread with id " + id + " deleted successfully."))
        .catch(function (err) {
            console.log("DeleteThread failed: " + err);
        });
}

export async function GetThread(id) {
    return await Thread.findById(id, {}, {})
        .then(function (foundThread) {
            console.log("Successfully retrieved thread with id " + foundThread._id);

            // Construct responses from found thread.
            var foundThreadResponses = [];
            foundThread.responses.forEach(function (response) {
                foundThreadResponses.push({
                    id: response._id,
                    text: response.text,
                    date: response.date
                })
            });

            // Return found thread as JSON.
            return JSON.stringify({
                id: foundThread._id,
                text: foundThread.message,
                date: foundThread.date,
                number_of_answers: foundThread.responses.length,
                responses: foundThreadResponses
            });
        })
        .catch(function (err) {
            console.log("GetThread failed: " + err);
            return "";
        });
}