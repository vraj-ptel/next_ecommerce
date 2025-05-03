import React from "react";

const SingleProductLoading = () => {
  return (
    <div className="animate-pulse flex flex-col items-center justify-center p-4">
      <div className="bg-gray-300 h-78 w-[60%] rounded-md mb-4" />
      <div className="w-[50%] flex flex-col items-end">
        <div className="bg-gray-300 h-5 w-1/5 rounded-md mb-4"></div>
        <div className="bg-gray-300 h-6 w-3/4 rounded mb-2" />
          {/* Price skeleton */}
          <div className="bg-gray-300 h-5 w-1/4 rounded mb-4" />
          {/* Button skeleton */}
          <div className="bg-gray-300 h-10 w-full rounded" />
      </div>
    </div>
  );
};

export default SingleProductLoading;
