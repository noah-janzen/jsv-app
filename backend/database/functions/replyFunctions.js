import Mongoose from 'mongoose';
import replySchema from '../schemas/replySchema.js';
import threadSchema from '../schemas/threadSchema.js';
import { currentDateAndTime } from './shared.js';

// Compile model from reply schema.
const Reply = Mongoose.model("Response", replySchema);

// Conpile model from thread schema.
const Thread = Mongoose.model("Thread", threadSchema);

/**
 * Creates a thread reply and adds it to the thread that has the specified id.
 * @param {*} thread_id Id of the thread to which the created reply should be added to.
 * @param {*} text The created reply's text.
 * @returns The newly created reply as a JSON object.
 */
const createReply = async (thread_id, text) => {
    return await Reply
        .create({
            text: text,
            thread_id: thread_id,
            date: currentDateAndTime()
        })
        .then(async function (createdReply) {
            return await Thread
                .findById(thread_id)
                .then(function (foundThread) {
                    // Add create reply to responses of found thread.
                    foundThread.responses.push(createdReply);
                    foundThread.save();

                    // Return created reply as JSON.
                    return JSON.stringify({
                        id: createdReply._id,
                        text: createdReply.text,
                        date: createdReply.date
                    });
                })
                .catch(function (err) {
                    console.log("createReply failed: " + err);
                    return "";
                });
        })
        .catch(function (err) {
            console.log("createReply failed: " + err);
            return "";
        });
};

/**
 * Deletes the reply that hast the specified id and also removes it from the thread it belongs to.
 * @param {*} id The id of the reply that should be deleted.
 */
const deleteReply = async (id) => {
    await Reply.findByIdAndDelete(id)
        .then(async function (deletedReply) {
            await Thread.findById(deletedReply.thread_id)
                .then(function (foundThread) {
                    // Remove deleted reply from found thread.
                    foundThread.responses.id(deletedReply._id).remove();
                    foundThread.save();
                })
                .catch(function (err) {
                    console.log("deleteReply failed: " + err);
                });
        })
        .catch(function (err) {
            console.log("deleteReply failed: " + err);
        });
};

export { createReply, deleteReply };