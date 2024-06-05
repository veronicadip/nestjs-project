import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";

// specify route, ex: POST url/auth
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }

    // here the route will be url/auth/register
    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ) {
        return this.service.register(registerDto);
    }

    @Post('login')
    async login(
        @Body()
        body: LoginDto,
        @Res({ passthrough: true })
        res: Response
    ) {

        const userInfo = await this.service.login(body);

        const { sessionCookie, expiresIn } = await this.service.createSessionCookie(body.token)

        res.cookie('session', sessionCookie, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.ENV_TYPE === "production",
            sameSite: process.env.ENV_TYPE === "production" ? "none" : "lax",
        });

        return {
            status: HttpStatus.OK,
            body: userInfo,
        };
    }

}