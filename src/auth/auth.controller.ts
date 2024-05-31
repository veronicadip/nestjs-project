import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

// specify route, ex: POST url/auth
@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }

    // here the route will be url/auth/signup
    @Post('signup')
    signup() {
        return this.service.signup()
    }

    @Post('signin')
    signin() {
        return this.service.signin()
    }
}