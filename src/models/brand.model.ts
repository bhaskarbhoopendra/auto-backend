import { Schema, model, Document } from 'mongoose';

// Define the Brand interface that extends Mongoose's Document
export interface IBrand extends Document {
  brandName: string;
  brandImage: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Brand schema
const BrandSchema = new Schema<IBrand>(
  {
    brandName: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
    },
    brandImage: {
      type: String,
      required: [true, 'Brand image URL is required'],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  },
);

// Create the Brand model
const Brand = model<IBrand>('Brand', BrandSchema);

export default Brand;
