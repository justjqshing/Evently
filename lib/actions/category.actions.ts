"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"

export const createCategory = async ({ categoryName, Creator }: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName, creator: Creator });

    

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error)
  }
}

export const getAllCategories = async (userId: string) => {
  try {
    await connectToDatabase();

    const categories = await Category.find( {creator: userId} );

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error)
  }
}
export const getACategory = async (category: string) => {
  try {
    await connectToDatabase();
   
    const categories = await Category.findByIdAndUpdate(category, {creator: 'DELETED'});


    return
  } catch (error) {
    handleError(error)
  }
}
export const getbyID = async (category: string) => {
  try {
    await connectToDatabase();
   
    const categories = await Category.findById(category);
    const name = categories?.name

    


    return JSON.parse(JSON.stringify(name))
  } catch (error) {
    handleError(error)
  }
}

export async function deleteCategory(id: string, ) {
  try {
    await connectToDatabase()

    // Find user to delete
    const userToDelete = await Category.findOne({ id })

    if (!userToDelete) {
      throw new Error('User not found')
    }

    // Unlink relationships
  } catch (error) {
    handleError(error)
  }
}