import Mongoose from 'mongoose';
import responseSchema from './responseSchema.js';

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
        type: [responseSchema],
        default: []
    }
});

export default threadSchema;