import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from '../product/dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/product/interfaces/user.interface';


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {

    }

    @Post() 
    async create(@Body() createUserDTO: CreateUserDTO) {
        return await this.userService.create(createUserDTO);
    }

    // route will require successfully passing the default auth strategy(JWT) 
    // IN order to access it

    @Get('test')
    @UseGuards(AuthGuard())
    testAuthRoute() {
        return {
            message: 'You did it!'
        }
    }
}
