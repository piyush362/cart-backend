import { Schema, model, Model, Document } from "mongoose";

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface ProductModelInterface extends Model<Product> {}

const ratingSchema = new Schema<Rating>(
  {
    rate: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const productSchema = new Schema<Product>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: ratingSchema,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = model<Product, ProductModelInterface>(
  "Product",
  productSchema
);
