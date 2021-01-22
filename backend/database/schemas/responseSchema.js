import Mongoose from 'mongoose';

const responseSchema = Mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    thread_id: {
        type: Mongoose.ObjectId,
        required: true
    }
});

export default responseSchema;