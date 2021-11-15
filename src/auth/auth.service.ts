import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from 'src/product/dtos/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from 'src/product/interfaces/jwt-payload.interface';



@Injectable()
export class AuthService {

    constructor(private usersService: UsersService, private jwt:JwtService) {}

    async validateUserByPassword(loginAttempt: LoginUserDTO) {

        //initial login
        let userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);

        return new Promise((resolve)=> {

            //check the supplied password against the hash stored for this email
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch)=> {
                if(err) throw new UnauthorizedException();

                if(isMatch){
                    //if success match, generate a JWT for the user       
                    resolve(this.createJwtPayload(userToAttempt));
                }
                else {
                    throw new UnauthorizedException();
                }
            });
        });

    }

    async validateUserByJwt(payload: JwtPayload) {
        
        //this will be used when the user has already logged in and has a JWT

        let user = await this.usersService.findOneByEmail(payload.email);

        if(user){
            return this.createJwtPayload(user);
        }
        else {
            throw new UnauthorizedException();
        }
    }

    createJwtPayload(user) {
        let data: JwtPayload = {
            email: user.email
        };

        let jwt = this.jwt.sign(data);

        return {
            expiresIn: 3600,
            token: jwt
        }





    }

}
