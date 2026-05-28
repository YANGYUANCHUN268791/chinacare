import mongoose, { Schema, models, model } from 'mongoose'

const ContactSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    age: { type: Number },
    country: { type: String, required: true },
    specialty: { type: String, required: true },
    conditionDescription: { type: String, required: true },
    urgency: {
      type: String,
      enum: ['urgent', 'soon', 'planning'],
      required: true,
    },
    preferredHospital: { type: String },
    budgetRange: { type: String },
    travelMonth: { type: String },
    additionalInfo: { type: String },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted'],
      default: 'new',
    },
  },
  { timestamps: true }
)

export default models.Contact || model('Contact', ContactSchema)
