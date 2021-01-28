import Mongoose from 'mongoose';
import threadSchema from '../schemas/threadSchema.js';
import { currentDateAndTime } from './shared.js';

// Compile model from thread schema.
const Thread = Mongoose.model("Thread", threadSchema);

/**
 * Retrieves all the currently available chat threads in descenfing order.
 * @returns A JSON object containing all the chat threads.
 */
const GetChatOverview = async () => {
    return await Thread
        .find({})
        .sort({ date: 'desc' })
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
};

/**
 * Creates a new chat thread with the specified message.
 * @param {*} message The new chat thread's message.
 * @returns The newly created chat thread as a JSON object.
 */
const CreateThread = async (message) => {
    return await Thread
        .create({
            message: message,
            date: currentDateAndTime()
        })
        .then(function (createdThread) {
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
};

/**
 * Deletes the chat thread that has the specified id.
 * @param {*} id The id of the chat thread that should be deleted.
 */
const DeleteThread = async (id) => {
    return await Thread
        .deleteOne({ _id: id })
        .catch(function (err) {
            console.log("DeleteThread failed: " + err);
        });
};

/**
 * Returns the chat thread that has the specified id.
 * @param {} id Id of the desired chat thread.
 * @returns The desired chat thread as a JSON object.
 */
const GetThread = async (id) => {
    return await Thread
        .findById(id)
        .then(function (foundThread) {
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
};

export { GetChatOverview, CreateThread, DeleteThread, GetThread };