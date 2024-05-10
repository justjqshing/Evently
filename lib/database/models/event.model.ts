import { url } from 'inspector'
import { Schema, model, models, Document } from 'mongoose'

export interface IEvent extends Document {
    _id: string;
    title: string;
    description: string;
    location?: string;
    createdAt: Date;
    imageUrl: string;
    Startdatetime: Date;
    Enddatetime: Date;
    price: string;
    isFree: boolean;
    url: string;
    category: { _id: string, name: string };
    Organizer: { _id: string, firstName: string, lastName: string};

}
const EventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    location: {type: String},
    createdAt: {type: Date, default: Date.now},
    imageUrl: {type: String, required: true},
    Startdatetime: {type: Date, default: Date.now, required: true},
    Enddatetime: {type: Date, default: Date.now},
    price: {type: String, required: true},
    isFree: {type: Boolean, default: false},
    url: {type: String, required: true},
    categpry: {type: Schema.Types.ObjectId, ref: 'Category'},
    Organizer: {type: Schema.Types.ObjectId, ref: 'User'},
})

const Event = models.Event || model('Event', EventSchema)

export default Event