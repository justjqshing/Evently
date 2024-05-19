import React from 'react';

const EventLoad = () => {
  return (
    <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl items-center">

        {/* Image Placeholder */}
        <div className="relative overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-300 h-[400px] md:h-[500px] w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
        </div>

        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            {/* Title Placeholder */}
            <div className="relative overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-300 h-12 md:h-16 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
            </div>

            {/* Price/Category Placeholders */}
            <div className="flex gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <div className="relative overflow-hidden rounded-full border-2 border-gray-300 bg-gray-300 h-10 w-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
                </div>
                <div className="relative overflow-hidden rounded-full border-2 border-gray-300 bg-gray-300 h-10 w-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-300 h-10 w-48 ml-2 mt-2 sm:mt-0">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {/* Date Placeholder */}
            <div className="flex gap-2 md:gap-3 items-center ">
              <div className="relative overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-300 h-10 w-10">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
              </div>
              <div className="flex flex-col flex-wrap items-start gap-2">
                <div className="relative overflow-hidden rounded-md border-2 border-gray-300 bg-gray-300 h-6 w-48">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
                </div>
                <div className="relative overflow-hidden rounded-md border-2 border-gray-300 bg-gray-300 h-6 w-48">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
                </div>
              </div>
            </div>

            {/* Location Placeholder */}
            <div className="flex items-center gap-3">
              <div className="relative overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-300 h-10 w-10">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
              </div>
              <div className="relative overflow-hidden rounded-md border-2 border-gray-300 bg-gray-300 h-8 w-64">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
              </div>
            </div>
          </div>

          {/* Description Placeholder */}
          <div className="flex flex-col gap-2">
            <div className="relative overflow-hidden rounded-md border-2 border-gray-300 bg-gray-300 h-6 w-56">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
            </div>
            <div className="relative overflow-hidden rounded-md border-2 border-gray-300 bg-gray-300 h-6 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
            </div>
            <div className="relative overflow-hidden rounded-md border-2 border-gray-300 bg-gray-300 h-6 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
            </div>
            <div className="relative overflow-hidden rounded-md border-2 border-gray-300 bg-gray-300 h-6 w-3/4">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-white to-gray-300 animate-gemini-loading"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventLoad;