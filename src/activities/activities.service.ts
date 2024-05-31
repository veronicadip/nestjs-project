import { Injectable, NotFoundException } from "@nestjs/common";
import { Activity } from "./activity.model";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class ActivitiesService {
    private activities: Activity[] = [];

    private findActivity(id: string): [Activity, number] {
        const activityIndex = this.activities.findIndex(activity => activity.id === id);
        const activity = this.activities[activityIndex];
        if (!activity) {
            throw new NotFoundException('Could not find activity.');
        }
        return [activity, activityIndex];
    }

    addActivity(place: string, price: { number: number, currency: string }) {
        const activityID = uuidv4();
        const newActivity = new Activity(activityID, place, price);
        this.activities.push(newActivity);
        return activityID;
    }

    getAllActivities() {
        return [...this.activities];
    }

    getActivity(activityID: string) {
        const activity = this.findActivity(activityID)[0];
        return { ...activity }
    }

    updateActivity(activityID: string, place: string, price: { number: number, currency: string }) {
        const [activity, index] = this.findActivity(activityID);
        this.activities[index] = { ...activity, ...(place && { place }), ...(price.number && price.currency && { price }) };
    }

    deleteActivity(activityID: string) {
        const [_, index] = this.findActivity(activityID);
        this.activities.splice(index, 1);
    }
}