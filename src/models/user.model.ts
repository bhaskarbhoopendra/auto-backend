import mongoose from 'mongoose';
import { CartSchema } from './cart.model';
import { WishlistSchema } from './wishlist.model';

// Define the Address schema
const addressSchema = new mongoose.Schema({
  addressLine1: {
    type: String,
    required: true,
    maxlength: 255,
  },
  addressLine2: {
    type: String,
    maxlength: 255,
  },
  city: {
    type: String,
    required: true,
    maxlength: 100,
  },
  state: {
    type: String,
    required: true,
    maxlength: 100,
  },
  pincode: {
    type: String,
    required: true,
    maxlength: 10,
  },
  landmark: {
    type: String,
    maxlength: 255,
  },
  addressType: {
    type: String,
    required: true,
    enum: ['Home', 'Office', 'Other'], // Can expand as needed
    default: 'Home',
  },
});

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 255,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
    },
    cognitoId: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
    },
    addresses: [addressSchema], // Multiple addresses as an array
    cart: [CartSchema],
    wishlist: [WishlistSchema],
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
  },
);

// Create and export the User model
const User = mongoose.model('User', userSchema);

export default User;
