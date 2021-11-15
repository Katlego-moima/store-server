import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../product/interfaces/user.interface';
import { CreateUserDTO } from '../product/dtos/create-user.dto';


@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private userModel: Model<User>) {}

    async create(createUserDTO: CreateUserDTO) {

        let createUser = new this.userModel(createUserDTO);
        return await createUser.save();
    }


    async findOneByEmail(email): Promise<User> {

        return await this.userModel.findOne({email: email});

    }


}
