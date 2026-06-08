import mongoose, { Schema, models, model } from 'mongoose'

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    planId: { type: String, required: true },
    planName: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },

    // Customer info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    country: { type: String, required: true },
    conditionDescription: { type: String },

    // Payment simulation
    paymentMethod: { type: String, default: 'simulated' },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'expired'],
      default: 'pending',
    },
    paidAt: { type: Date },
    cardLast4: { type: String }, // simulated

    // Service tracking
    status: {
      type: String,
      enum: ['pending', 'processing', 'report_generated', 'coordinator_assigned', 'completed'],
      default: 'pending',
    },
    notes: { type: String },

    // Metadata
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
)

export default models.Order || model('Order', OrderSchema)
