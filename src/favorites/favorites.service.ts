import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite } from './schemas/favorite.schema';
import { Model } from 'mongoose';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoritesService {

    constructor(@InjectModel(Favorite.name) private favoriteModel: Model<Favorite>) { }

    async addOneFavorite(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
        const { user, activity } = createFavoriteDto;

        const existingFavorite = await this.favoriteModel.findOne({ userId: user, activityId: activity }).exec();
        if (existingFavorite) {
            throw new ConflictException('This activity is already saved in favorites.');
        }

        const newFavorite = new this.favoriteModel({
            userId: user,
            activity: activity,
        });
        return newFavorite.save();
    };

    async removeOneFavorite(userId: string, activityId: string): Promise<string> {
        const result = await this.favoriteModel.deleteOne({ userId, activity: activityId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Favorite not found');
        }
        return "Deleted successfully"
    }


    async getFavoritesByUser(userId: string): Promise<Favorite[]> {
        return await this.favoriteModel.find({ userId }).populate('activity').exec();
    }

};
