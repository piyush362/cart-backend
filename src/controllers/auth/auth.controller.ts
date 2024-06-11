import { Response, Request } from "express";
import { User } from "../../models/user.model";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { Product } from "../../models/product.model";

export async function register(request: Request, response: Response) {
  const { userName } = request.body;

  if (!userName) {
    throw new ApiError(409, "username required");
  }

  const isUserExist = await User.findOne({
    $or: [{ userName }],
  });

  if (isUserExist) {
    // throw new ApiError(409, "username already exist");
    return response
      .status(201)
      .json(new ApiResponse(200, isUserExist, "User Authorized"));
  }

  const user = await User.create({
    userName: userName,
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong");
  }

  return response
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Authorized"));
}

export async function seedProductData(request: Request, response: Response) {
  try {
    const { password } = request.body;
    const passKey = process.env.AUTH_PASS_KEY;

    if (passKey !== password) {
      throw new ApiError(401, "Unauthorized");
    }

    console.log("Getting the data from the storage...");

    const apiResponse = await fetch("https://fakestoreapi.com/products");
    const productsData = await apiResponse.json();

    console.log("Seeding the data to the server...");

    for (const productData of productsData) {
      const existingProduct = await Product.findOne({
        title: productData.title,
      });

      if (!existingProduct) {
        const product = {
          title: productData.title,
          price: productData.price,
          description: productData.description,
          category: productData.category,
          image: productData.image,
          rating: {
            rate: productData.rating.rate,
            count: productData.rating.count,
          },
        };

        await Product.create(product);
      }
    }

    response.status(200).json({ message: "Product data seeded successfully" });
  } catch (error) {
    console.error("Error seeding product data:", error);
    response.status(500).json({ message: "Internal server error" });
  }
}
