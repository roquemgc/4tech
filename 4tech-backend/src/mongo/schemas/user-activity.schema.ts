import * as mongoose from 'mongoose';
import { MediaCommentViewModel } from 'src/domain/viewmodel/media/media-comment.viewmodel';

export interface UserActivity extends mongoose.Document {
    readonly _id: mongoose.Schema.types.ObjectId,
    readonly userId: string,
    readonly userName: string,
    readonly fileName: string,
    readonly timestamp: Date;
    likes: string[],
    comments: MediaCommentViewModel[];
}

const MediaCommentSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    comment: String,
    timeStamp: Date,
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
    comments: [MediaCommentSchema]
});




