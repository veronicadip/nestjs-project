import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ActivitiesModule } from './activities/activities.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UsersModule } from './users.module';


@Module({
  imports: [AuthModule, ActivitiesModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get('MONGODB_USERNAME')}:${configService.get('MONGODB_PASSWORD')}@cluster0.9ambpnq.mongodb.net/?retryWrites=true&w=majority&appName=${configService.get('MONGODB_DATABASE_NAME')}`,
      }),
      inject: [ConfigService],
    }),
    UsersModule],
})
export class AppModule { }
