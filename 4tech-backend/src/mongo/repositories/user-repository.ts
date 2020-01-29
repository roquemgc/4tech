import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/viewmodel/user.viewmodel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/mongo/schemas/user.schema'

@Injectable()
export class UserRepository {

    constructor(@InjectModel('User') private readonly userCollection: Model<User>){

    }

    async getByCredentials(userLoginFromViewModel: string, passwordFromViewModel: string){
        return await this.userCollection
            .findOne({ 
                userLogin: userLoginFromViewModel, 
                password: passwordFromViewModel 
            })
    }

    async getById(userId: string): Promise<User>{
        return await this.userCollection
            .findOne({ _id: userId })
            .lean();
    }

    async getUsers(): Promise<User[]>{
        return await this.userCollection
        .find()
        .select({ __v: false, password: false })//Filtrar os atributos que serão retornados
        .lean();
    }

    async createUser(newUser: UserViewModel){
        const user = this.userCollection(newUser);
        return await user.save();
    }

    async updateUser(user: UserViewModel){
        const updatedUser = await this.userCollection.findOneAndUpdate(
            {userLogin: user.userLogin},
            user,
            { new: true },
        );

        return await updatedUser.save();
    }
}
