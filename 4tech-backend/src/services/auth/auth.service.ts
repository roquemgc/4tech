import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginViewModel } from 'src/domain/viewmodel/login.viewmodel';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/mongo/repositories/user-repository';

@Injectable()
export class AuthService {

    constructor(private userRepository: UserRepository, private jwtService: JwtService){
    }

    async login(login: LoginViewModel) {
        const user = await this.userRepository.getByCredentials(login.userLogin, login.password);

        if(!user){
            throw new BadRequestException('Login ou senha incorretos!'); 

        }
        return {
            access_token: this.jwtService.sign({ status: 'Authorized' }),
            userId: user._id,
        };

    }
}
