import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
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
    @Put(':userName/update')
    updateUser(@Param('userName') userName, @Body() user: UserViewModel){
        return this.userService.updateUser(userName, user);
    }

}
