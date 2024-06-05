import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcryptjs from "bcryptjs";
import { LoginDto } from "./dto/login.dto";

@Injectable({})
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async register({ token, email, password, name }: RegisterDto) {
        const user = await this.usersService.findOneByToken(token);

        if (user) {
            throw new BadRequestException('User already registered');
        }

        return await this.usersService.create({
            token,
            email,
            password: await bcryptjs.hash(password, 10),
            name,
        });
    }

    async login({ token }: LoginDto) {
        const user = await this.usersService.findOneByToken(token);

        if (!user) {
            throw new UnauthorizedException('Token not found');
        }

        return user;
    }

}