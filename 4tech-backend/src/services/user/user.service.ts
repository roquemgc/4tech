import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/mongo/repositories/user-repository';
import { UserViewModel } from 'src/domain/viewmodel/user.viewmodel';
import { LoginViewModel } from 'src/domain/viewmodel/login.viewmodel';

@Injectable()
export class UserService {

    constructor(readonly userRepository: UserRepository){
    }

    getUsers(){
        return this.userRepository.getUsers();
    }

    async createNewUser(newUser: UserViewModel){

        const usersList = await this.userRepository.getUsers()
        const existingUser = usersList.find(elem => elem.userName === newUser.userName);
        
        if(existingUser){
            throw new BadRequestException('This user already exists');
        }

        this.userRepository.createUser(newUser);
    }

    updateUser(user){

        this.userRepository.updateUser(user);
    }

    async attemptLogin(login: LoginViewModel){
        const usersList = await this.userRepository.getUsers();
        
        const foundLogin = usersList.find(elem => 
            elem.userLogin === login.userLogin &&
            elem.password === login.password
        );

        return foundLogin;
    }
}
