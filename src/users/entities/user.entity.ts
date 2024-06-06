import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type UserDocument = User & Document;

// define the schema
@Schema()
export class User {

    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    id: Types.ObjectId;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: false })
    biography?: string;

    @Prop({ required: false })
    location?: {
        province: string;
        city: string;
    };

    @Prop({ required: false })
    user_photos?: {
        avatar?: string;
        cover?: string;
    }

    @Prop({ required: true, default: { following: 0, followers: 0 } })
    follows: {
        following: number;
        followers: number;
    };

    @Prop({ default: ["user"] })
    role: string[];

    @Prop({ default: null })
    deletedAt: Date | null;

}

// create the schema with createForClass method (it returns a Schema)
export const UserSchema = SchemaFactory.createForClass(User);
