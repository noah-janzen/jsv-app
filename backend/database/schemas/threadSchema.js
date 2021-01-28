import Mongoose from 'mongoose';
import replySchema from './replySchema.js';

// Describes a chat thread in the database.
const threadSchema = Mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    responses: {
        type: [replySchema],
        default: []
    }
});

export default threadSchema;