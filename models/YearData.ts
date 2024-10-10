import mongoose, { Document, Schema } from 'mongoose'

interface Event {
  date: string
  description: string
}

interface YearData extends Document {
  year: number
  events: Event[]
}

const EventSchema: Schema = new Schema({
  date: { type: String, required: true },
  description: { type: String, required: true },
})

const YearDataSchema: Schema = new Schema({
  year: { type: Number, required: true, index: true },
  events: { type: [EventSchema], required: true },
})

export default mongoose.models.YearData ||
  mongoose.model<YearData>('YearData', YearDataSchema)
