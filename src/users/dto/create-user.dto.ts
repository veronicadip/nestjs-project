import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";

class LocationType {
    @IsString()
    province: string;

    @IsString()
    city: string;
}

class UserPhotosType {
    @IsString()
    @IsOptional()
    avatar?: string;

    @IsString()
    @IsOptional()
    cover?: string;
}

class FollowsType {
    @IsNumber()
    following: number;

    @IsNumber()
    followers: number;
}

export class CreateUserDto {
    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    first_name: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(3)
    last_name: string;


    @IsOptional()
    @IsString()
    biography?: string;


    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @IsOptional()
    @Type(() => LocationType)
    location?: LocationType;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => UserPhotosType)
    user_photos?: UserPhotosType;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => FollowsType)
    follows: FollowsType;
}
