import { Schema, model, Document } from 'mongoose';
import { IBrand } from './brand.model'; // Import Brand interface

import { ICategory } from './category.model';
export interface ISubcategory extends Document {
  subcategoryName: string;
  subcategoryImage: string;
  category: ICategory['_id']; // Reference to Category
  brand: IBrand['_id']; // Reference to Brand
  createdAt: Date;
  updatedAt: Date;
}

// Define the Subcategory schema
const SubcategorySchema = new Schema<ISubcategory>(
  {
    subcategoryName: {
      type: String,
      required: [true, 'Subcategory name is required'],
      trim: true,
    },
    subcategoryImage: {
      type: String,
      required: [true, 'Subcategory image URL is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
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

// Create the Subcategory model
const Subcategory = model<ISubcategory>('Subcategory', SubcategorySchema);
export default Subcategory;
