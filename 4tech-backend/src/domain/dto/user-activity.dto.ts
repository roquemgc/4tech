import { UserActivityCommentDto } from "./user-activit-comment.dto";
import { mongoose } from 'mongoose'

export class UserActivityDto {

    constructor(userId: string, fileName: string, userName: string){
        this.userId = userId;
        this.userName = userName;
        this.fileName = fileName;
        this.timestamp = new Date();
        this.likes = [];
        this.comments = [];
    }

    readonly _id: mongoose.Schema.Types.ObjectID;
    readonly userId: string;
    readonly fileName: string;
    readonly userName: string;
    readonly timestamp: Date;
    readonly likes: string[];
    readonly comments: UserActivityCommentDto[];
}