'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories, isCategoryUsed } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchContext } from "./searchContext";

const CategoryFilter = () => {
  const [track, setTrack] = useState(0); // Add this line
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [active, setActive] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setQuery } = useSearchContext(); // Access setQuery for clearing search

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

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

  useEffect(() => {
    console.log('reloaded')
    if (!searchParams.get('category')) {
      console.log('no category')
    }
  }, [searchParams]); 

  const onSelectCategory = (category: string) => {
    let newUrl = '';

    if (category && category !== 'All') {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'category',
        value: category,
      });
    } else {
      // Clear all filters (including search) when "All" is selected
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ['category', 'limit', 'query'], // Remove other filter keys if applicable
      });
      setQuery(''); // Clear the search query
    }

    router.push(newUrl, { scroll: false });
  };
  const handleValueChnage = ({ value }: { value: string }) => {
    
    if (!searchParams.get('category') && track > 0) {
      setTrack(track + 1);
      onSelectCategory('hfggfh');
    } else {
      onSelectCategory(value);
    }

  };

  return (
    <Select onValueChange={(value) => handleValueChnage({ value })} defaultValue="All" value={searchParams.get('category') || 'All'}>
      <SelectTrigger className="select-field">
        <SelectValue  />
      </SelectTrigger>
      <SelectContent >
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
        {active.map((category) => (
          <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;