import * as mongoose from 'mongoose';

export interface User extends mongoose.Document{
    readonly _id: mongoose.Schema.Types.ObjectId;
    readonly userLogin: string,
    readonly userName: string,
    readonly password: string,
}

export const UserSchema = new mongoose.Schema({
    userLogin: String,
    userName: String,
    password: String,
})
