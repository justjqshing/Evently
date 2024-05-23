"use server"

import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";

export const createCategory = async ({ categoryName, Creator }: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    // 1. Check if Category Exists
    let existingCategory = await Category.findOne({ name: categoryName });

    if (existingCategory) {
      // 2a. Add Creator to Array (if not already present)
      if (!existingCategory.creator.includes(Creator)) {
        existingCategory.creator.push(Creator);
        await existingCategory.save(); // Important: Save changes
      }

      return JSON.parse(JSON.stringify(existingCategory)); // Return updated category
    } else {
      // 2b. Create New Category
      const newCategory = await Category.create({ 
        name: categoryName, 
        creator: [Creator] // Initialize creators array
      });

      return JSON.parse(JSON.stringify(newCategory));
    }
  } catch (error) {
    handleError(error);
  }
};

export const getUserCatagories = async (userId: string) => {
  try {
    await connectToDatabase();

    const categories = await Category.find( {creator: userId} );

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error)
  }
}
export const getACategory = async (categoryId: string, creatorToDelete?: string) => { // Made creatorToDelete optional
  try {
    await connectToDatabase();
    let category = await Category.findById(categoryId);

    if (!category) {
      throw new Error('Category not found');
    }

    // Handle optional deletion of creator (if creatorToDelete is provided)
    if (creatorToDelete) {
      if (category.creator.length > 1) {
        category.creator = category.creator.filter(//@ts-ignore
        c => c !== creatorToDelete);
      } else if (category.creator.length === 1) {
        category.creator = ["DELETED"];
      }
      await category.save(); // Save changes if deletion occurred
    }

    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    handleError(error);
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
export async function getAllCategories (){
  try {
    await connectToDatabase();

    const categories = await Category.find();

    return JSON.parse(JSON.stringify(categories));


  } catch (error) {
    handleError(error)
  }
}
