import { Transform } from "class-transformer";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {

    @IsString()
    token: string;

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    name?: string;

}