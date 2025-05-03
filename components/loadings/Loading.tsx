
import React from 'react'

const skeletonArray = Array.from({ length: 8 })

const Loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {skeletonArray.map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse bg-gray-200 rounded-lg shadow-md p-4 flex flex-col"
        >
          {/* Image skeleton */}
          <div className="bg-gray-300 h-40 w-full rounded-md mb-4" />
          {/* Title skeleton */}
          <div className="bg-gray-300 h-6 w-3/4 rounded mb-2" />
          {/* Price skeleton */}
          <div className="bg-gray-300 h-5 w-1/4 rounded mb-4" />
          {/* Button skeleton */}
          <div className="bg-gray-300 h-10 w-full rounded" />
        </div>
      ))}
    </div>
  )
}

export default Loading

