import { Router } from "express";
import catchAsync from "../utils/asyncWrapper";
import {
  getMyCart,
  addToCart,
  changeItemQuantity,
  deleteCartItem,
  getAllProduct,
} from "../controllers/cartItem/cartItem.controller";

const router = Router();

router.get("/getAllProduct", catchAsync(getAllProduct));

router.post("/getMyCart", catchAsync(getMyCart));

router.post("/addToCart", catchAsync(addToCart));
router.post("/changeItemQuantity", catchAsync(changeItemQuantity));
router.post("/deleteCartItem", catchAsync(deleteCartItem));

export default router;
