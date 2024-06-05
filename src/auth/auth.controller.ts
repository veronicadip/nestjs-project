import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

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
    login(
        @Body()
        loginDto: LoginDto
    ) {
        return this.service.login(loginDto);
    }


}