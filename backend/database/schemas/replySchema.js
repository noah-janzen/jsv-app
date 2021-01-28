import Mongoose from 'mongoose';
import { currentDateAndTime } from '../functions/shared.js';

// Describes a reply to a chat thread in the database.
const replySchema = Mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    thread_id: {
        type: Mongoose.ObjectId,
        required: true
    }
});

export default replySchema;