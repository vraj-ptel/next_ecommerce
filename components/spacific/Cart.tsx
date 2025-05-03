"use client";
import {
  cartItem,
  decreseQuantity,
  getCart,
  increseQuantity,
  removeFromCart,
  setQuantity,
} from "@/redux/cartslice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser } from "@/redux/userslice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdDelete } from "react-icons/md";

const Cart = () => {

  const router=useRouter();
  const cart = useAppSelector(getCart);
  const user=useAppSelector(getUser);
  const dispatch = useAppDispatch();

  // // Local state for quantities
  // const [quantities, setQuantities] = useState<{ [id: number]: number }>(() =>
  //   cart.reduce((acc: { [id: number]: number }, item: productType) => {
  //     acc[item.id] = 1;
  //     return acc;
  //   }, {})
  // );

  const [errMessage,setErrMessage]=useState<string>("");

  const handleQuantityChange = (id: number, value: number) => {
    dispatch(setQuantity({id,quantity:value}))
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    if(!user){
      setErrMessage('please login to proceed to checkout');
    }

    router.push('/checkout')

  };

  const total = cart.reduce((acc,prev)=>{
    return acc+(prev.price*prev.quantity)
  },0)

  const removeItem = (id: number) => {
    dispatch(removeFromCart(id));
  };
  const increaseQuan = (id: number) => {
    dispatch(increseQuantity(id));
  };
  const decreaseQuan = (id: number) => {
    dispatch(decreseQuantity(id));
  };

  return user? (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 py-10 px-2">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-violet-700 mb-8 text-center">
          Your Cart
        </h1>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <h2 className="text-2xl font-bold text-gray-600">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mt-2">
              Add some products to see them here!
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cart.map((item: cartItem) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md p-4 gap-4 transition hover:shadow-lg"
                >
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="rounded-lg object-contain bg-gray-50"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 w-full">
                    <h2 className="text-lg font-semibold text-indigo-800">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xl font-bold text-violet-600">
                        ${item.price}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 rounded bg-violet-100 text-violet-700 hover:bg-violet-200 transition"
                          onClick={() => decreaseQuan(item.id)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={1}
                          // value={quantities[item.id] || 1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              Number(e.target.value)
                            )
                          }
                          className="w-12 text-center border rounded px-1 py-0.5"
                        />
                        <button
                          className="px-2 py-1 rounded bg-violet-100 text-violet-700 hover:bg-violet-200 transition"
                          onClick={() => increaseQuan(item.id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="cursor-pointer text-red-500 hover:text-red-700 transition"
                        onClick={() => {
                          removeItem(item.id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                  {/* Buy Now button removed */}
                </div>
              ))}
            </div>
            {/* Cart Summary */}
            <div className="w-full md:w-80 bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 h-fit">
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                Summary
              </h3>
              <div className="flex flex-col gap-2">
                {cart.map((item: cartItem) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-700"
                  >
                    <span className="truncate">{item.title}</span>
                    <span>
                      {item.quantity} x ${item.price}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 my-2" />
              <div className="flex justify-between font-bold text-lg text-violet-700">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className="cursor-pointer mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              {errMessage && (
                <div className="text-red-500 text-sm mt-2">
                  {errMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  ):(<>{router.push('/signin')}</>);
};

export default Cart;
