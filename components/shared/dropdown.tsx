import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ICategory } from "@/lib/database/models/category.model"
import { startTransition, useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { createCategory, getAllCategories } from "@/lib/actions/category.actions"

import { auth } from "@clerk/nextjs/server"
import { getUserByClerkId, getUserById } from "@/lib/actions/user.actions"
import { buttonVariants } from "@/components/ui/button"


type DropdownProps = {
  value?: string
  onChangeHandler?: () => void
  userId: string
}


const Dropdown = ({ value, onChangeHandler, userId }: DropdownProps) => {
  

  const [categories, setCategories] = useState<ICategory[]>([])
  const [check, setCheck] = useState('')
  const [newCategory, setNewCategory] = useState('');
  const [AlreadyExist, setAlreadyExist] = useState(false)
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')

  const handleAddCategory = async () => {
    setOpen(!open)
    
    const user = await getUserByClerkId(userId)
    setUsername(user.username)
    if(categories.some(category => category.name === newCategory)) {
      setAlreadyExist(true)
      

      return

    };
    createCategory({
      categoryName: newCategory.trim(),
      Creator: user.username,
     
    })
      .then((category) => {
        setCategories((prevState) => [...prevState, category])
      })
  }

  useEffect(() => {
    const getCategories = async () => {
      const user = await getUserByClerkId(userId)
      const categoryList = await getAllCategories(user.username);
      categoryList && setCategories(categoryList as ICategory[])
    }

    getCategories();
  }, [])

  return (
    <>
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 && categories.map((category) => (
          <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}
        <div className="flex w-full px-3 text-primary-500 hover:bg-primary-50 focus:text-primary-500 relative cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        <h1 onClick={() => setOpen(!open)} className="select-item p-regular-14">
        Add New
        </h1>

        </div>
       

      </SelectContent>
    </Select>
    <AlertDialog open={open}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Category name" className="input-field mt-3 bg-coral " onChange={(e) => setNewCategory(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(!open)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={AlreadyExist}>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>"{newCategory}" Already Exists!</AlertDialogTitle>
              <AlertDialogDescription>
                
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className={buttonVariants({ variant: "coral" })} onClick={() => setAlreadyExist(!AlreadyExist)}>Ok</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </>
  )
}

export default Dropdown