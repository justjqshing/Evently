"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllCategories, isCategoryUsed } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";

const CategoryFilter = ({reset, setReset}: any) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [category, setCategory] = useState('');
  const router = useRouter();
  const [active, setActive] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();

  const cachedActiveCategories = useRef<ICategory[]>([]);
  const isInitialRender = useRef(true);

  const refineCategories = useCallback(async () => {
    const activeCategories: ICategory[] = [];
    for (const category of categories) {
      const isActive = await isCategoryUsed(category._id);
      if (isActive) {
        activeCategories.push(category);
      }
    }
    setActive(activeCategories);
    cachedActiveCategories.current = activeCategories;
  }, [categories]);

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();
      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (cachedActiveCategories.current.length === 0 || cachedActiveCategories.current.length !== categories.length) {
      refineCategories();
    } else {
      setActive(cachedActiveCategories.current);
    }
  }, [categories, refineCategories]);

  const onSelectCategory = useCallback((category: string) => {
    setCategory(category)
    setReset(false);
    let newUrl = '';

    if (category && category !== 'All') {
      newUrl = formUrlQuery({ params: searchParams.toString(), key: 'category', value: category });
    } else {
      newUrl = removeKeysFromQuery({ params: searchParams.toString(), keysToRemove: ['category'] });
    }

    router.push(newUrl, { scroll: false });
}, [searchParams, router]);

const toggleOverlayVisible = useCallback(() => {
  setOverlayVisible(prev => !prev);
}, []);

const cachedActiveMap = useMemo(() => active.map((category) => (
  <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
    {category.name}
  </SelectItem>
)), [active]);

return (
  <>
    <div className={`${overlayVisible ? 'md:hidden block' : 'hidden'} absolute top-[100%] h-[1000%]  w-screen  z-40`}></div>
    <div className="z-50 flex w-full ">
      <Select onValueChange={onSelectCategory} onOpenChange={toggleOverlayVisible} value={reset ? 'All' : category}>
        <SelectTrigger className="select-field" onClick={toggleOverlayVisible}>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
          {cachedActiveMap}
        </SelectContent>
      </Select>
    </div>
  </>
);
};

export default CategoryFilter;
