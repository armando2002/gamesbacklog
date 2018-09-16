import mongoose from 'mongoose';

// use destructuring to grab the Schema class from mongoose
const {Schema} = mongoose;

// schema for DB model based on wireframes
const backlogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title required']
    },
    platform: {
        type: String
    },
    status: {
        type: String
    },
    comments: {
        type: String
    },
    dateAdded: {
        type: String
    },
    lastPlayed: {
        type: String
    }
})

// export the 'Backlog' model using the backlogSchema
export default mongoose.model('Backlog', backlogSchema);
