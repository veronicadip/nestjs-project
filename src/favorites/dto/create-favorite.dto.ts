import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavoriteDto {
    @IsNotEmpty()
    @IsString()
    user: string;

    @IsNotEmpty()
    @IsString()
    activity: string;
}