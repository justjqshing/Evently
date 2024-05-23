
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from "@/lib/actions/event.actions";
import Search from "@/components/shared/Search";
import { SearchParamProps } from "@/types";
export default async function Home({ searchParams }: SearchParamProps) {

  const page = Number(searchParams.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const getEvents = await getAllEvents({
    query: searchText,
    category: '',
    limit: 6,
    page,
  })

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
      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12 text-center">
        <h2 className="h2-bold">Trusted by <br className="max-sm:flex hidden"/> Thousands of Events</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
         <Search/>
          CategoryFilter
        </div>

        <Collection
        data={getEvents?.data}
        emptyTitle='No Events Found'
        emptyStateSubtext='Come Back Later for More Events'
        collectionType='All_Events'
        limit={6}
        page={1}
        totalPages={2}
        />


       
      </section>
      
    </>
)
}
