import Mongoose from 'mongoose';

// Describes an event in the database.
const eventSchema = Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    image_uri: {
        type: String,
        required: false
    },
    is_public: {
        type: Boolean,
        default: 0
    },
    number_of_yes: {
        type: Number,
        default: 0
    },
    number_of_no: {
        type: Number,
        default: 0
    },
    number_of_not_sure: {
        type: Number,
        default: 0
    },
});

export default eventSchema;