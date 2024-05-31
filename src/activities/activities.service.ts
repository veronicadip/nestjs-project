import { Injectable, NotFoundException } from "@nestjs/common";
import { Activity } from "./activity.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class ActivitiesService {
    ç

    constructor(@InjectModel("Activity") private readonly activityModel: Model<Activity>) { }

    private async findActivity(id: string): Promise<Activity> {
        let activity;
        try {
            activity = await this.activityModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find activity.');
        }
        if (!activity) {
            throw new NotFoundException('Could not find activity.');
        }
        return activity;
    }

    async addActivity(place: string, price: { number: number, currency: string }) {
        const newActivity = new this.activityModel({ place, price });
        const result = await newActivity.save();
        return result.id as string;
    }

    async getAllActivities() {
        const activities = await this.activityModel.find().exec();
        return activities.map((act) => ({ id: act.id, place: act.place, price: { number: act.price.number, currency: act.price.currency } })) as Activity[];
    }

    async getActivity(activityID: string) {
        const activity = await this.findActivity(activityID);
        return { id: activity.id, place: activity.place, price: { number: activity.price.number, currency: activity.price.currency } };
    }

    async updateActivity(activityID: string, place: string, price: { number: number, currency: string }) {
        const updatedActivity = await this.findActivity(activityID);
        if (place) {
            updatedActivity.place = place;
        }
        if (price.number) {
            updatedActivity.price.number = price.number;
        }
        if (price.currency) {
            updatedActivity.price.currency = price.currency;
        }
        updatedActivity.save();
    }

    async deleteActivity(activityID: string) {
        const result = await this.activityModel.deleteOne({ _id: activityID }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find activity.');
        }
    }
}