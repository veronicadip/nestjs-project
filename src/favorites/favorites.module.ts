import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './schemas/favorite.schema';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Activity } from 'src/activities/schemas/activity.schema';
import { ActivitySchema } from 'src/activities/activity.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Favorite.name, schema: FavoriteSchema }, { name: User.name, schema: UserSchema }, { name: Activity.name, schema: ActivitySchema }])
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController]
})
export class FavoritesModule { }
