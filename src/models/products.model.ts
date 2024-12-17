import { Schema, model, Document } from 'mongoose';
import { ICategory } from './category.model'; // Import Category model
import { IBrand } from './brand.model'; // Import Brand model

export interface IProduct extends Document {
  name: string;
  description: string;
  images: string[];
  specialFeatures: string;
  productInfo: string;
  category: ICategory['_id']; // Reference to Category
  brand: IBrand['_id']; // Reference to Brand
  createdAt: Date;
  updatedAt: Date;
  price: number;
  stock: number;
  ratings: IRating[];
}

export interface IRating {
  user: Schema.Types.ObjectId; // Reference to the user who gave the rating
  rating: number; // The rating value (e.g., 1 to 5)
  comment?: string; // Optional comment
}

const RatingSchema = new Schema<IRating>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Assuming ratings range from 1 to 5
  },
  comment: {
    type: String,
    trim: true,
  },
});

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    images: [
      {
        type: String,
        required: [true, 'Product images are required'],
      },
    ],
    specialFeatures: {
      type: String,
      required: [true, 'Special features are required'],
    },
    productInfo: {
      type: String,
      required: [true, 'Product information is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category', // Reference to Category model
      required: true,
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand', // Reference to Brand model
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    ratings: [RatingSchema],
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  },
);

const Product = model<IProduct>('Product', ProductSchema);
export default Product;
