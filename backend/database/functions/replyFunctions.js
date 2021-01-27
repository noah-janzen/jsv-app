import Mongoose from 'mongoose';
import replySchema from '../schemas/replySchema.js'
import threadSchema from '../schemas/threadSchema.js';

const Reply = Mongoose.model("Response", replySchema);
const Thread = Mongoose.model("Thread", threadSchema)

export async function CreateReply(thread_id, text) {
    return await Reply.create({
        text: text,
        thread_id: thread_id
    })
        .then(async function (createdReply) {
            return await Thread.findById(thread_id, {}, {})
                .then(function (foundThread) {
                    foundThread.responses.push(createdReply);
                    foundThread.save();

                    console.log("Successfully created a reply with id " + createdReply._id + " for thread with id " + foundThread._id);

                    // Return created reply as json.
                    return JSON.stringify({
                        id: createdReply._id,
                        text: createdReply.text,
                        date: createdReply.date
                    });
                })
                .catch(function (err) {
                    console.log("CreateReply failed: " + err);
                    return "";
                });
        })
        .catch(function (err) {
            console.log("CreateReply failed: " + err);
            return "";
        });
}

export async function DeleteReply(id) {
    await Reply.findByIdAndDelete(id, {})
        .then(async function (deletedReply) {
            await Thread.findById(deletedReply.thread_id, {}, {})
                .then(function (foundThread) {
                    foundThread.responses.id(deletedReply._id).remove();
                    foundThread.save();

                    console.log("Successfully removed reply with id " + deletedReply._id);
                })
                .catch(function (err) {
                    console.log("DeleteReply failed: " + err);
                });
        })
        .catch(function (err) {
            console.log("DeleteReply failed: " + err);
        });
}