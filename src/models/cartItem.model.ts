import { Schema, model, Model } from "mongoose";

interface CartItem {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  quantity: number;
  addedAt: Date;
}

interface CartItemInterface extends Model<CartItem> {}

const cartItemSchema = new Schema<CartItem>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

export const CartItem = model<CartItem, CartItemInterface>(
  "CartItem",
  cartItemSchema
);
