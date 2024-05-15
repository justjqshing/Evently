"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { eventFormSchema } from "@/lib/validator"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { format } from "date-fns"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventDefaultValues } from "@/constants"
import Dropdown from "./dropdown"
import { FileUploader } from "./FileUploader"
import Image from 'next/image'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { createEvent } from "@/lib/actions/event.actions"

type EventFormProps = {
    userId: string,
    type: 'Create' | 'Update'
}
const EventForm = ({ userId, type}: EventFormProps) => {
    const router = useRouter();


    const [checked, setChecked] = useState(false)
    const [date, setDate] = useState<Date>()
    const [files, setFiles] = useState<File[]>([])
    const initialValues = eventDefaultValues

    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof eventFormSchema>>({
      resolver: zodResolver(eventFormSchema),
      defaultValues: 
        initialValues,
      })
        
        // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        let uploadedImageUrl = values.imageUrl
        if(files.length > 0){
        const uploadedImages = await startUpload(files)

        if(!uploadedImages) {
          return
        }
        uploadedImageUrl = uploadedImages[0].url
        }
        if(type === 'Create'){
          try {
            const newEvent = await createEvent({
              event: { ...values, imageUrl: uploadedImageUrl},
              userId,
              path: '/profile'

            })
            
          } catch (error) {
            console.log(error)
          }
        }

    }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row gap-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl className="title-field">
                <Input placeholder="Event title" {...field} />
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="md:min-w-[15%] max-w-full p-0">
              <FormControl>
                <Dropdown onChangeHandler={field.onChange} value={field.value} userId={userId}></Dropdown>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-5">
      <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl className="h-72">
              <Textarea placeholder="Description" {...field} className="textarea rounded-2xl"/>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl className="h-72">
                <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles}/>
                

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-5">
      <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl className="input-field">
                <div className="flex-center h-[55px] w-full overflow-ellipsis rounded-full bg-gray-50 px-4 py-2">
                  <Image src="/assets/icons/location-grey.svg" width={20} height={20} alt="location" />
                  <Input placeholder="Event Location or Online" {...field} className="input-field"/>

                </div>
                
                
                
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
          <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date: Date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

      
        <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/dollar.svg"
                        alt="dollar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <Input type="number" disabled={checked} placeholder="Price"  {...field}  value={checked ? '120' : field.value} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                      <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center">
                                <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                                <Checkbox
                                    onCheckedChange={field.onChange}
                                    checked={field.value}
                                    onClick={() => setChecked(!checked)}
                                    id="isFree" 
                                    className="mr-2 h-5 w-5 border-2 border-primary-500" 
                                  />
                              </div>
          
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />   
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />   
             <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/link.svg"
                        alt="link"
                        width={24}
                        height={24}
                      />

                      <Input placeholder="URL" {...field} className="input-field" />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        </div>

        <div className="flex justify-end">
        <Button 
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 md:max-w-[200px] w-full"
        >
          {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Event `}</Button>
        </div>
       
      </form>
    </Form>
  )
}

export default EventForm