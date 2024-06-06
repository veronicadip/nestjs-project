import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Activity } from "src/activities/schemas/activity.schema";
import { User } from "src/users/entities/user.entity";

@Schema()
export class Favorite {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: User;

    @Prop({ type: Types.ObjectId, ref: 'Activity', required: true })
    activity: Activity[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);