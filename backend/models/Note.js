import mongoose, { Schema } from 'mongoose';

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: { type: String, required: true },
    style: { bgColor: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Note', NoteSchema);
