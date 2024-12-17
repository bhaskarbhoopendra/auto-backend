import { Schema, model, Document } from 'mongoose';
import { IBrand } from './brand.model'; // Import Brand interface

// Define the Category interface that extends Mongoose's Document
export interface ICategory extends Document {
  categoryName: string;
  categoryImage: string;
  brand: IBrand['_id']; // Reference to Brand
  createdAt: Date;
  updatedAt: Date;
}

// Define the Category schema
const CategorySchema = new Schema<ICategory>(
  {
    categoryName: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
    },
    categoryImage: {
      type: String,
      required: [true, 'Category image URL is required'],
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create the Category model
const Category = model<ICategory>('Category', CategorySchema);
export default Category;
