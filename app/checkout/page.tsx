"use client";
import { getCart } from "@/redux/cartslice";
import { useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/userslice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Image from "next/image";
import React from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Page = () => {
  const cart = useAppSelector(getCart);
  const user = useAppSelector(getUser);
    
  const createStripeCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkOutSession = await axios.post(
      "/api/checkout-sessions",
      {
        items: cart,
        email: user?.email,
      },
      { withCredentials: true }
    );
    console.log(checkOutSession);
    const result=await stripe?.redirectToCheckout({
        sessionId:checkOutSession.data.id
    })
    if(result?.error){
        console.log("errror",result.error   )
    }

  };

  return (
    <div className="">
      <div className="flex items-center gap-3">
        {/* <Image height={40} width={40} src={''} alt="Logo" /> */}
        <h1
          className={`text-3xl font-extrabold tracking-tight drop-shadow-lg transition-colors duration-300 
             "text-indigo-900" 
          `}
        >
          E-commerce
          <span className="text-violet-400">App</span>
        </h1>
      </div>
      <div className="w-full flex flex-col items-center justify-center ">
        <h1 className="text-5xl">Checkout</h1>
      </div>

      <div className="flex align-center justify-center mt-5">
        {cart.map((item) => (
          <div key={item.id} className="flex  justify-cente items-center">
            <Image
              src={item.image}
              height={100}
              width={100}
              alt={item.title}
            ></Image>
            <div className="ml-3">
              <h3>{item.title}</h3>
              <h3>
                {item.price} * {item.quantity} ={" "}
                <span className="text-shadow-emerald-50 text-3xl text-indigo-400">
                  ${item.price * item.quantity}
                </span>
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <button onClick={createStripeCheckoutSession} className="bg-violet-400 p-3 rounded text-white hover:bg-violet-500 cursor-pointer transition">
          Complete Your Purchase{" "}
        </button>
      </div>
    </div>
  );
};

export default Page;
