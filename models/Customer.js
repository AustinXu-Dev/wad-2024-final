import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  memberNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  interests: {
    type: [String],
    default: [],
  },
});

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema);
