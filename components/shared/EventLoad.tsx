import React from 'react'

const EventLoad = () => {
  return (
<section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
  <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl items-center">

    {/* Image Placeholder */}
    <div className="h-[400px] md:h-[500px] w-full bg-gray-200 animate-pulse"></div>

    <div className="flex w-full flex-col gap-8 p-5 md:p-10">
      <div className="flex flex-col gap-6">

        {/* Title Placeholder */}
        <div className="bg-gray-200 h-12 md:h-16 w-full rounded-xl animate-pulse"></div>

        {/* Price/Category Placeholders */}
        <div className="flex gap-3 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <div className="bg-gray-200 h-10 w-24 animate-pulse rounded-full"></div>
            <div className="bg-gray-200 h-10 w-20 animate-pulse rounded-full"></div>
          </div>
          <div className="bg-gray-200 h-10 w-48 ml-2 mt-2 sm:mt-0 rounded-xl animate-pulse"></div>
        </div>
      </div>

      <div className="flex flex-col gap-5">

        {/* Date Placeholder */}
        <div className="flex gap-2 md:gap-3 items-center ">
          <div className="bg-gray-200 h-10 w-10 animate-pulse rounded-xl"></div>
          <div className="flex flex-col flex-wrap items-start gap-2">
            <div className="bg-gray-200 h-6 w-48 animate-pulse rounded-md"></div>
            <div className="bg-gray-200 h-6 w-48 animate-pulse rounded-md"></div>
          </div>
        </div>

        {/* Location Placeholder */}
        <div className="flex items-center gap-3">
          <div className="bg-gray-200 h-10 w-10 rounded-xl animate-pulse"></div>
          <div className="bg-gray-200 h-8 w-64 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Description Placeholder */}
      <div className="flex flex-col gap-2">
        <div className="bg-gray-200 h-6 w-56 rounded-md  animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-full rounded-md  animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-full rounded-md  animate-pulse"></div>
        <div className="bg-gray-200 h-6 w-3/4 rounded-md  animate-pulse"></div>
      </div>
    </div>
  </div>
</section>
  )
}

export default EventLoad