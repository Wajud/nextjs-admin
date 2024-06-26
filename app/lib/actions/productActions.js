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

export const updateProduct = async (formData) => {
  const { id, title, desc, price, stock, color, size } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const currentProduct = await Product.findById(id);

    const updatedProduct = { title, desc, price, stock, color, size };

    Object.keys(updatedProduct).forEach((key) => {
      if (updatedProduct[key] === "" || undefined) {
        updatedProduct[key] = currentProduct[key];
      }
    });

    await Product.findByIdAndUpdate(id, updatedProduct);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create product");
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create product");
  }
  revalidatePath("/dashboard/products");
};
