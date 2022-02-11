import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface IBook extends Document {
  title: string;
  overview: string;
  category: string;
  price: number;
  created_date: Date;
}

export type CreateBook = {
  title: string,
  overview: string,
  category: string,
  price: number
}

const BookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  created_date: {
    type: Date,
    default: new Date()
  }
});

export const Book = mongoose.model<IBook>('book', BookSchema);
