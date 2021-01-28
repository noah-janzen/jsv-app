import Mongoose from 'mongoose';
import replySchema from './replySchema.js';

const threadSchema = Mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    responses: {
        type: [replySchema],
        default: []
    }
});

export default threadSchema;