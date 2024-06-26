'use server'
import { CreateEventParams, GetAllEventsParams, GetRelatedEventsByCategoryParams, UpdateEventParams } from "@/types"
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import User from '@/lib/database/models/user.model'
import { handleError } from "../utils";
import Category from "../database/models/category.model";
import { revalidatePath } from 'next/cache'
import { DeleteEventParams } from '@/types'
function getRandomSortOrder() {
  const options = ["desc", "asc"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: name })
}
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
export async function getAllEvents({ query, limit = 6, page, category }: GetAllEventsParams) {
  try {
    await connectToDatabase()

    if (query && query.endsWith('\\')) {
      query = query.slice(0, -1);
    }

    const titleCondition = query ? { title: { $regex: new RegExp(query, 'i') } } : {}
    const categoryCondition = category ? await getCategoryByName(category) : null
    const conditions = {
      $and: [titleCondition, categoryCondition ? { category: categoryCondition._id } : {}],
    }
    const skipAmount = (Number(page) - 1) * limit
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)
      

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

export async function deleteEvent({ eventId, path }: DeleteEventParams) {
    try {
      await connectToDatabase()
  
      const deletedEvent = await Event.findByIdAndDelete(eventId)
      if (deletedEvent) revalidatePath(path)
    } catch (error) {
      handleError(error)
    }
  }
  export async function updateEvent({ userId, event, path }: UpdateEventParams) {
    try {
      await connectToDatabase()
  
      const eventToUpdate = await Event.findById(event._id)
      if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
        throw new Error('Unauthorized or event not found')
      }
  
      const updatedEvent = await Event.findByIdAndUpdate(
        event._id,
        { ...event, category: event.categoryId },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedEvent))
    } catch (error) {
      handleError(error)
    }
  }
  export async function getRelatedEventsByCategory({
    categoryName, 
    eventId,
    limit = 3,
    page = 1,
}: GetRelatedEventsByCategoryParams) {
    try {
        await connectToDatabase();
        const skipAmount = (Number(page) - 1) * limit;

        // 1. Get all Event IDs with the same category name
        const relatedEventIds = await Event.find({ 
            category: { $in: await Category.find({ name: categoryName }).distinct('_id') }
        }).distinct('_id');

        // 2. Filter out the current event
        const filteredEventIds = relatedEventIds.filter(id => id.toString() !== eventId);

        // 3. Query events by filtered IDs and paginate
        const sortOrder = getRandomSortOrder();
        const eventsQuery = Event.find({ _id: { $in: filteredEventIds } })
            //@ts-ignore
            .sort({ createdAt: sortOrder })
            .skip(skipAmount)
            .limit(3);

        const events = await populateEvent(eventsQuery);

        // 4. Calculate the total number of related events
        const eventsCount = filteredEventIds.length;

        return { 
            data: JSON.parse(JSON.stringify(events)), 
        };
    } catch (error) {
        handleError(error);
    }
}
export const getUserEvents = async (UserId: string) => {
  try {
      await connectToDatabase();

      const event = await populateEvent(Event.find({organizer: UserId}));

      if(!event){
          throw new Error('Event not found');
      } 

      return JSON.parse(JSON.stringify(event));
  } catch (error) {
      handleError(error)
  }
}