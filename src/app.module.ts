import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [AuthModule, ActivitiesModule],
})
export class AppModule { }
