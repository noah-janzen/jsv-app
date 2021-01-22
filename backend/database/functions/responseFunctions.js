import Mongoose from 'mongoose';
import responseSchema from '../schemas/responseSchema.js'
import threadSchema from '../schemas/threadSchema.js';

const Response = Mongoose.model("Response", responseSchema);
const Thread = Mongoose.model("Thread", threadSchema)

export async function CreateResponse(thread_id, text) {
    return await Response.create({
        text: text,
        thread_id: thread_id
    }).exec()
        .then(async function (createdResponse) {
            return await Thread.findById(thread_id, {}, {}).exec()
                .then(function (foundThread) {
                    foundThread.responses.push(createdResponse);
                    foundThread.save();

                    console.log("Successfully created a response with id " + createdResponse._id + " for thread with id " + foundThread._id);

                    // Return created response as json.
                    return JSON.stringify({
                        id: createdResponse._id,
                        text: createdResponse.text,
                        date: createdResponse.date
                    });
                })
                .catch(function (err) {
                    console.log("CreateResponse failed: " + err);
                    return "";
                });
        })
        .catch(function (err) {
            console.log("CreateResponse failed: " + err);
            return "";
        });
}

export async function DeleteResponse(id) {
    await Response.findByIdAndDelete(id, {}).exec()
        .then(async function (deletedResponse) {
            await Thread.findById(deletedResponse.thread_id, {}, {}).exec()
                .then(function (foundThread) {
                    foundThread.responses.id(deletedResponse._id).remove();
                    foundThread.save();

                    console.log("Successfully removed response with id " + deletedResponse._id);
                })
                .catch(function (err) {
                    console.log("DeleteResponse failed: " + err);
                });
        })
        .catch(function (err) {
            console.log("DeleteResponse failed: " + err);
        });
}