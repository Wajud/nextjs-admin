"use server";
import { revalidatePath } from "next/cache";
import { connectToDB } from "../utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import Product from "../models/productsModel";

export const addProduct = async (formData) => {
  const { title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const newProduct = new Product({ title, desc, price, stock, color, size });

    await newProduct.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create product");
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};
