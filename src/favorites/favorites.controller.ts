import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {

    constructor(private readonly favoritesService: FavoritesService) { }

    @Post()
    async addFavorite(@Body() createFavoriteDto: CreateFavoriteDto) {
        return await this.favoritesService.addOneFavorite(createFavoriteDto);
    };

    @Delete(':userId/:activityId')
    async removeFavorite(@Param('userId') userId: string, @Param('activityId') activityId: string) {
        return await this.favoritesService.removeOneFavorite(userId, activityId);
    };

    @Get(':userId')
    async getFavorites(@Param('userId') userId: string) {
        return await this.favoritesService.getAllFavorites(userId);
    };

};
