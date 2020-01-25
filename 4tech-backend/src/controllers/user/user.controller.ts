import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {

    constructor(private userService: UserService){
        
    }

    @Get()
    getUsers(){
        return this.userService.getUsers();
    }

    @Post()
    createUser(@Body() newUser: UserViewModel){
        return this.userService.createNewUser(newUser);
    }

    @Put(':userName/update')
    updateUser(@Param('userName') userName, @Body() user: UserViewModel){
        return this.userService.updateUser(userName, user);
    }

}
