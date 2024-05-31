import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ActivitiesService } from "./activities.service";

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) { }
    @Post()
    async addActivity(@Body() reqBody: { place: string, price: { number: number, currency: string } }) {
        const generatedID = await this.activitiesService.addActivity(reqBody.place, reqBody.price);
        return { id: generatedID };
    }

    @Get()
    async getAllActivities() {
        const result = { activities: await this.activitiesService.getAllActivities() };
        return result;
    }

    @Get(':id')
    getActivity(@Param('id') activityID: string) {
        return this.activitiesService.getActivity(activityID);
    }

    @Patch(':id')
    async updateActivity(@Param('id') activityID: string, @Body() reqBody: { place: string, price: { number: number, currency: string } }) {
        await this.activitiesService.updateActivity(activityID, reqBody.place, reqBody.price);
        return "Activity updated successfully";
    }

    @Delete(':id')
    async removeActivity(@Param('id') activityID: string) {
        await this.activitiesService.deleteActivity(activityID);
        return "Activity deleted successfully";
    }
}