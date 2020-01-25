import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { LoginViewModel } from 'src/domain/login.viewmodel';

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
            throw new BadRequestException('Esse usuário ja existe');
        }

        this.userRepository.createUser(newUser);
    }

    updateUser(userName, user){
        // const usersList =  this.userRepository.getUsers();

        // const existingUser = usersList.filter(elem => (elem.userName === userName));
        // console.log(existingUser);

        // this.userRepository.updateUser(userName, user);
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
