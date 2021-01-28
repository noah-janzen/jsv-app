import Mongoose from 'mongoose';

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
        default: new Date()
    }
});

export default newsSchema;