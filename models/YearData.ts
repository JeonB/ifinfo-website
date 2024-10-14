import mongoose, { Document, Schema, Types } from 'mongoose'

export interface Event {
  _id?: Types.ObjectId
  date: string
  description: string
}

export interface YearData extends Document {
  year: number
  events: Event[]
}

const EventSchema: Schema = new Schema(
  {
    date: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: true },
)

const YearDataSchema: Schema = new Schema({
  year: { type: Number, required: true, index: true },
  events: { type: [EventSchema], required: true },
})

export default mongoose.models.YearData ||
  mongoose.model<YearData>('YearData', YearDataSchema)
