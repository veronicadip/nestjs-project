import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcryptjs from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { admin } from "./firebase-admin.module";
import { User } from "src/users/entities/user.entity";

@Injectable({})
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async verifyAndGetUser(accessToken: string): Promise<{
        decodedToken: DecodedIdToken,
        userInfo: User
    }> {
        let userData;
        await admin.auth().verifyIdToken(accessToken).then(
            (res) => {
                userData = res;
            }
        ).catch(() => {
            throw new UnauthorizedException('Token not found');
        })

        const user = await this.usersService.findOneByEmail(userData.email);

        return { decodedToken: userData, userInfo: user };
    }

    async createSessionCookie(accessToken: string): Promise<{
        sessionCookie: string,
        expiresIn: number
    }> {
        const days = 5;
        const expiresIn = 60 * 60 * 24 * days * 1000;
        const sessionCookie = await admin.auth().createSessionCookie(accessToken, {
            expiresIn
        })
        return { sessionCookie, expiresIn };
    }

    async register({ email, password, name }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already registered');
        }

        return await this.usersService.create({
            email,
            password: await bcryptjs.hash(password, 10),
            name,
        });
    }



    async login({ token }: LoginDto) {
        const user = await this.verifyAndGetUser(token);

        if (!user) {
            throw new UnauthorizedException('Token not found');
        }

        // const {sessionCookie, expiresIn} = await this.createSessionCookie(token)

        return user;
    }

}