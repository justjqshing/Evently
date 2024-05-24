"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isCategoryUsed } from "@/lib/actions/category.actions";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [Overlay, SetOverlay] = useState(false);
  const router = useRouter();
  const [active, setActive] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories();
  }, [])

  const onSelectCategory = (category: string) => {
      let newUrl = '';

      if(category && category !== 'All') {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'category',
          value: category
        })
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['category']
        })
      }

      router.push(newUrl, { scroll: false });
  }
  const RefineCategories = async () => {
    let activeCategories: ICategory[] = [];

    for (let category of categories) {
      const isActive = await isCategoryUsed(category._id);
      if (isActive) {
        activeCategories.push(category);
      }
    }

    setActive(activeCategories);
  };

  useEffect(() => {
    RefineCategories();
  }, [categories]);


  return (
    <>
    <div className={`${Overlay ? 'block' : 'hidden'} absolute top-[100%] mr-[1000px] h-full w-screen bg-transparent z-40`}>

    </div>
    <div className="z-50">


    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field" onClick={() => SetOverlay(true)} >
        
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>

        {active.map((category) => (
          <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    </div>
    </>
   
  )
}

export default CategoryFilter