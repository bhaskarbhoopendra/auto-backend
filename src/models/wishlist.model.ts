import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from './products.model';
// Import Product model

export interface IWishlistItem extends Document {
  product: IProduct['_id']; // Reference to the Product
}

const WishlistItemSchema = new Schema<IWishlistItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product', // Reference to Product model
      required: true,
    },
  },
  { _id: false }, // Disable _id generation for each wishlist item
);

export const WishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    items: [WishlistItemSchema], // List of products in the wishlist
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  },
);

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
export default Wishlist;
