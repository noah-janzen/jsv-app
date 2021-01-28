import Mongoose from 'mongoose';
import { currentDateAndTime } from '../functions/shared.js';

// Describes a news article in the database.
const newsSchema = Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image_uri: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: currentDateAndTime()
    }
});

export default newsSchema;