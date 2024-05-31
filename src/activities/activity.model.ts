import * as mongoose from "mongoose";

export const ActivitySchema = new mongoose.Schema({
    place: { type: String, required: true },
    price: {
        type: {
            number: Number,
            currency: String,
        }, required: true
    }
});

export interface Activity extends mongoose.Document {
    id: string;
    place: string;
    price: { number: number, currency: string };
}