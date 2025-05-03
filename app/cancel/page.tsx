import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='mt-[90px] flex flex-col items-center justify-center'>
      <h1 className='text-red-400 text-3xl'>Something Went Wrong </h1>
      <button>

      <Link
          href="/"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Back to Home
        </Link>
      </button>
    </div>
  )
}

export default Page
