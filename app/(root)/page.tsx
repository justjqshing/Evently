
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Limit from "@/components/shared/Limit";
import Filters from "@/components/shared/Filters";

export default async function Home({ searchParams }: SearchParamProps) {


  const page = Number(searchParams.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';
  const limit = parseInt(searchParams?.limit as string) || 6;
  const getEvents = await getAllEvents({
    query: searchText,
    category,
    page,
    limit
  })

  console.log(getEvents?.totalPages)

  return (

    <>
       <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Host, Connect, Celebrate: Your Events, Our Platform!</h1>
            <p className="p-regular-20 md:p-regular-24">Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">
                Explore Now
              </Link>
            </Button>
          </div>

          <Image src='/assets/images/hero.png' width={1000} height={1000} alt='Evently Logo'/>
        </div>
      </section> 
      <section id="events" className="wrapper my-0 flex flex-col gap-8 md:gap-12 text-center">
        <h2 className="h2-bold">Trusted by <br className="max-sm:flex hidden"/> Thousands of Events</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row -mb-7">
         <Filters limit={limit} totalPages={getEvents?.totalPages} searchParams={searchParams} params={{
            id: ""
          }}/>
        </div>

        
        <Collection
        data={getEvents?.data}
        emptyTitle='No Events Found'
        emptyStateSubtext='Come Back Later for More Events'
        collectionType='All_Events'
        limit={6}
        page={1}
        totalPages={getEvents?.totalPages}
        />

      </section>
      
    </>
)
}
