import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type UserDocument = User & Document;

// define the schema
@Schema()
export class User {

    @Prop({ type: SchemaTypes.ObjectId, auto: true })
    id: Types.ObjectId

    @Prop({ required: true, unique: true })
    token: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    name?: string;

    @Prop({ default: ["user"] })
    role: string[];

    @Prop({ default: null })
    deletedAt: Date | null;

}

// create the schema with createForClass method (it returns a Schema)
export const UserSchema = SchemaFactory.createForClass(User);
