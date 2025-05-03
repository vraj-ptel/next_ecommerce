"use client";
import { addToCart } from "@/redux/cartslice";
import { useAppDispatch } from "@/redux/hooks";
import { productType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Product = ({ product }: { product: productType }) => {
  const router=useRouter();
  const dispatch=useAppDispatch()

  //add to cart logic
  const addTOCart = () => {
    // Add your add to cart logic here
    dispatch(addToCart(product))
    console.log(`Product ${product.id} added to cart`);
  };

  // on click of product, navigate to product details page
  const handleClick = () => {
    // Handle click event, e.g., navigate to product details page
    router.push(`/product/${product.id}`);
    console.log("Product clicked:", product.id);
  };
  return (
    <div onClick={handleClick} className=" cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-3 flex flex-col md:flex-row gap-6 items-center max-w-3xl mx-auto my-8 border border-gray-100">
      <div className="flex-shrink-0">
        <Image
          alt={product.title}
          src={product.image}
          height={320}
          width={220}
          className="rounded-xl mix-blend-multiply object-cover shadow-md hover:scale-105 transition-transform duration-300 height-auto width-auto"
          priority
        />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-violet-600">{product.title}</h2>
        <p className="text-gray-600 text-base line-clamp-4">
          {product.description}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-2xl font-semibold text-indigo-500">
            ${product.price}
          </span>
          <span className="bg-violet-100 text-violet-600 px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-400 text-lg">★</span>
          <span className="text-gray-700 font-medium">
            {JSON.parse(product.rating).rate}
          </span>
          <span className="text-gray-400 text-sm">(rating) out of</span>
          <span>{JSON.parse(product.rating).count}</span>
        </div>
        <button onClick={addTOCart} className="mt-4 bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200 w-fit cursor-pointer">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
