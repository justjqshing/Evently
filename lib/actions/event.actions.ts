'use server'
import { CreateEventParams } from "@/types"
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import User from '@/lib/database/models/user.model'
import { handleError } from "../utils";
export const createEvent = async ({event, userId, path}: CreateEventParams) => {
    try {
        await connectToDatabase();
        const organizer = await User.findById(userId);

        if (!organizer) throw new Error('User not found');

        console.log(`The Category Is : ${event.categoryId}`)

        const newEvent = await Event.create({ ...event, category: 'Hello', organizer: userId});
    
        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error)
    }
}