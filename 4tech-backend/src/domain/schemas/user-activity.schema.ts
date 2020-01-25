import * as mongoose from 'mongoose';

const UserActivityCommentsSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    comment: String,
    timeStamp: {
        type: Date,
        default: Date.now(),
    },
})

export const UserActivitySchema = new mongoose.Schema({
    userId: String,
    userName: String,
    fileName: String,
    likes: [String],
    timeStamp: {
        type: Date,
        default: Date.now()
    },
    comments: [UserActivityCommentsSchema]
});




