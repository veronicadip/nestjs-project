import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersService } from "src/users/users.service";
import { UsersModule } from "src/users/users.module";

@Module({
    // we import the module instead of the service because this module needs to read the users module to find that the UsersService is exported
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }