import { Request, Response } from "express";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { User } from "../../models/user.model";
import { CartItem } from "../../models/cartItem.model";
import { Product } from "../../models/product.model";

async function getAllProduct(request: Request, response: Response) {
  const products = await Product.find({});
  return response
    .status(200)
    .json(new ApiResponse(200, { products }, "Success"));
}

async function getMyCart(request: Request, response: Response) {
  const { userId } = request.body;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const cartItems = await CartItem.find({ userId }).populate({
    path: "productId",
    model: Product,
  });

  const cartData = cartItems.map((item) => ({
    id: item._id,
    product: item.productId,
    quantity: item.quantity,
  }));

  return response
    .status(200)
    .json(new ApiResponse(200, { cartData }, "Success"));
}

async function addToCart(request: Request, response: Response) {
  const { userName, productId } = request.body;

  const user = await User.findOne({
    $or: [{ userName }],
  });

  if (!user) {
    throw new ApiError(400, "User Not Found");
  }

  let cartItem = await CartItem.findOne({ userId: user._id, productId });

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cartItem = await CartItem.create({
      userId: user._id,
      productId,
      quantity: 1,
    });
  }

  await cartItem.save();

  return response
    .status(200)
    .json(new ApiResponse(200, { cartItem }, "Operation successful"));
}

async function changeItemQuantity(request: Request, response: Response) {
  const { cartItemId, quantity } = request.body;

  if (!cartItemId || !quantity || isNaN(quantity) || quantity <= 0) {
    throw new ApiError(400, "Invalid input data");
  }

  const cartItem = await CartItem.findById(cartItemId);

  if (!cartItem) {
    throw new ApiError(400, "Cart item not found");
  }

  cartItem.quantity = quantity;

  await cartItem.save();

  return response
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cartItem },
        "Cart item quantity updated successfully"
      )
    );
}

async function deleteCartItem(request: Request, response: Response) {
  const { cartItemId } = request.body;

  if (!cartItemId) {
    throw new ApiError(500, "Cart item ID is required");
  }

  const cartItem = await CartItem.findByIdAndDelete(cartItemId);

  return response
    .status(201)
    .json(new ApiResponse(200, cartItem, "Item delete Successfully"));
}

export {
  addToCart,
  getMyCart,
  changeItemQuantity,
  deleteCartItem,
  getAllProduct,
};
