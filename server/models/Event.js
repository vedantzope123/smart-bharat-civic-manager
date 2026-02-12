const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['cultural', 'sports', 'education', 'health', 'community', 'other'],
    default: 'community'
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  endDate: Date,
  location: {
    address: { type: String, required: true },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  organizer: { type: String, required: true },
  organizerContact: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxAttendees: Number,
  images: [String],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);