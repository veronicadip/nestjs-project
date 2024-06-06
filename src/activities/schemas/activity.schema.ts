import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Activity extends Document {
    @Prop({ type: String })
    title: string;

    @Prop({ type: String })
    type: string;

    @Prop({ type: String })
    img: string;

    @Prop({
        type: {
            number: { type: Number },
            total: { type: Number },
        },
    })
    rating: {
        number: number,
        total: number
    };

    @Prop([{
        id: { type: String },
        name: { type: String }
    }])
    inscriptions: { id: string, name: string }[];

    @Prop({
        type: {
            id: { type: String },
            name: { type: String }
        },
    })
    organizator: {
        id: string,
        name: string
    };

    @Prop({ type: String })
    meeting_place: string;

    @Prop({ type: String })
    dificulty: string;

    @Prop({ type: String })
    floor_unevenness: string;

    @Prop({ type: Number })
    kilometers: number;

    @Prop({ type: Number })
    duration_minutes: number;

    @Prop({ type: Date })
    date: Date;

    @Prop({
        type: {
            number: { type: Number },
            currency: { type: String },
        },
    })
    price: {
        number: number,
        currency: string
    };
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
