"use client"
import { clearCart } from '@/redux/cartslice';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';
import { useEffect } from 'react';

const Page = () => {
    const dispatch=useAppDispatch();
    useEffect(()=>{
        dispatch(clearCart());
    },[dispatch])
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        {/* Success Icon */}
        <div className="bg-green-100 rounded-full p-4 mb-6">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="white" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12.5l3 3 5-5"
            />
          </svg>
        </div>
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Thank You for Your Purchase!
        </h1>
        {/* Subtext */}
        <p className="text-gray-600 text-center mb-6">
          Your order was successful. We appreciate your business and hope you enjoy your purchase.
        </p>
        {/* Button (optional, e.g., go back to home) */}
        <Link
          href="/"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Page;
