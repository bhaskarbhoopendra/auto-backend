import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './products.model';
// Import Product model

export interface ICartItem extends Document {
  product: IProduct['_id']; // Reference to the Product
  quantity: number;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product', // Reference to Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Ensure at least one item is in the cart
    },
  },
  { _id: false }, // Disable _id generation for each cart item
);

export const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    items: [CartItemSchema], // List of products with quantities
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  },
);

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;
