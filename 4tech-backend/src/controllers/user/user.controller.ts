import { Controller, Get, Post, Put, Body, UseGuards, Delete } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/viewmodel/user.viewmodel';
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {

    constructor(private userService: UserService){
        
    }
    
    @Post()
    createUser(@Body() newUser: UserViewModel){
        return this.userService.createNewUser(newUser);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    getUsers(){
        return this.userService.getUsers();
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/update')
    updateUser(@Body() user: UserViewModel){
        console.log(user);
        return this.userService.updateUser(user);
    }

}
