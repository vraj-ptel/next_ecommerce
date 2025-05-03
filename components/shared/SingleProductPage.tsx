
import { addToCart } from '@/redux/cartslice'
import { useAppDispatch } from '@/redux/hooks'
import { productType } from '@/types'
import React from 'react'
import Image from 'next/image'

const SingleProductPage = ({ product }: { product: productType }) => {
    const dispatch=useAppDispatch()
    // Add your add to cart logic here
    const addTOCart=()=>{
        // Add your add to cart logic here
        dispatch(addToCart(product));
        console.log(`Product ${product.id} added to cart`);
    }
    // Add your buy now logic here
    const buyNow=()=>{

    }

  return (
    <div className="max-w-[80%] mx-auto my-10 bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-8 border border-gray-100">
      {/* Product Image */}
      <div className="flex-shrink-0 flex justify-center items-center md:w-1/2">
        <Image
          src={product.image}
          alt={product.title}
          className="rounded-xl object-contain w-full max-w-xs h-72 bg-gray-50 shadow-md transition-transform duration-300 hover:scale-105"
        />
      </div>
      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-4 justify-center">
        <h1 className="text-3xl font-extrabold text-violet-700">{product.title}</h1>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-indigo-500">${product.price}</span>
          <span className="bg-violet-100 text-violet-600 px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>
        </div>
        <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-400 text-xl">★</span>
          <span className="text-gray-800 font-medium">{JSON.parse(product.rating).rate} -</span>
          <span className="text-gray-400 text-sm">({JSON.parse(product.rating).count ?? 0} reviews)</span>
        </div>
        <div className='flex items-center gap-2 mt-4'>
        <button onClick={addTOCart} className=" cursor-pointer mt-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors duration-200 w-fit">
          Add to Cart
        </button>
        <button onClick={buyNow} className=" cursor-pointer mt-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-8 rounded-lg shadow transition-colors duration-200 w-fit">
          Buy Now
        </button>
        </div>
        
      </div>
    </div>
  )
}

export default SingleProductPage
