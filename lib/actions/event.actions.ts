'use server'
import { CreateEventParams, GetAllEventsParams } from "@/types"
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import User from '@/lib/database/models/user.model'
import { handleError } from "../utils";
import Category from "../database/models/category.model";

const populateEvent = (query: any) => {
    return query
      .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
      .populate({ path: 'category', model: Category, select: '_id name' })
  }
export const createEvent = async ({event, userId, path}: CreateEventParams) => {
    try {
        await connectToDatabase();
        const organizer = await User.findById(userId);

        if (!organizer) throw new Error('User not found');

        console.log(`The Category Is : ${event.categoryId}`)

        const newEvent = await Event.create({ ...event, category: event.categoryId, organizer: userId});
    
        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        handleError(error)
    }
}

export const getEventById = async (eventId: string) => {
    try {
        await connectToDatabase();

        const event = await populateEvent(Event.findById(eventId));

        if(!event){
            throw new Error('Event not found');
        } 

        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error)
    }
}
export const getAllEvents = async ({query, limit = 6, page, category}: GetAllEventsParams) => {
    try {
        await connectToDatabase();

        const conditions: any = {};

        const eventsquery = Event.find(conditions).sort({ createdAt: 'desc' })
        .skip(0)
        .limit(6)
        const events = await populateEvent(eventsquery);
        const eventCount = await Event.countDocuments(conditions);
        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventCount / limit),
        }   
    } catch (error) {
        handleError(error)
    }
}