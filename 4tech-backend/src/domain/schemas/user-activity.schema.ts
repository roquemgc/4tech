import * as mongoose from 'mongoose';
import { UserActivityCommentDto } from '../dto/user-activit-comment.dto';

export interface UserActivity extends mongoose.Document {
    readonly _id: mongoose.Schema.types.ObjectId,
    readonly userId: string,
    readonly userName: string,
    readonly fileName: string,
    readonly timestamp: Date;
    likes: string[],
    comments: UserActivityCommentDto[];
}

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




