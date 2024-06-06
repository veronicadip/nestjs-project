import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite } from './schemas/favorite.schema';
import { Model } from 'mongoose';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {

    constructor(@InjectModel(Favorite.name) private favoriteModel: Model<Favorite>) { }

    async addOneFavorite(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
        const newFavorite = new this.favoriteModel({
            user: createFavoriteDto.user,
            activity: createFavoriteDto.activity,
        });
        return newFavorite.save();
    };

    async removeOneFavorite(userId: string, activityId: string): Promise<Favorite> {
        return this.favoriteModel.findOneAndDelete({ user: userId, activity: activityId });
    };

    async getAllFavorites(userId: string): Promise<Favorite[]> {
        return this.favoriteModel.find({ user: userId }).populate('activity').exec();
    };

};
