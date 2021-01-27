import Mongoose from 'mongoose';
import replySchema from './replySchema.js';

const threadSchema = Mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    responses: {
        type: [replySchema],
        default: []
    }
});

export default threadSchema;