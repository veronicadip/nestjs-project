import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ActivitiesService } from "./activities.service";

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) { }
    @Post()
    addActivity(@Body() reqBody: { place: string, price: { number: number, currency: string } }) {
        const generatedID = this.activitiesService.addActivity(reqBody.place, reqBody.price);
        return { id: generatedID };
    }

    @Get()
    getAllActivities() {
        return { activities: this.activitiesService.getAllActivities() };
    }

    @Get(':id')
    getActivity(@Param('id') activityID: string) {
        return this.activitiesService.getActivity(activityID);
    }

    @Patch(':id')
    updateActivity(@Param('id') activityID: string, @Body() reqBody: { place: string, price: { number: number, currency: string } }) {
        this.activitiesService.updateActivity(activityID, reqBody.place, reqBody.price);
        return "Activity updated successfully";
    }

    @Delete(':id')
    removeActivity(@Param('id') activityID: string) {
        this.activitiesService.deleteActivity(activityID);
        return "Activity deleted successfully";
    }
}