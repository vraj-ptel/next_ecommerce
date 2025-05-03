
"use client";
import superbase from "@/lib/superbase/products";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser, setUser } from "@/redux/userslice";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isOtpSent,setIsOtpSent]=useState(false);
  const router=useRouter()
  const dispatch=useAppDispatch();
  const userFromRedux=useAppSelector(getUser);
  console.log("userformredux",userFromRedux)

  const signIN = async () => {

     
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    const { data, error } = await superbase.auth.signInWithOtp(
      {
        email: email,
        
       
      }
    );
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("otp sent!");
      console.log("dataa",data);
      //  dispatch(setUser({name:data.user.email?.split("@")[0],email:data.user.email,created_at:data.user.created_at}))
      // setSuccessMsg("Check your email for the confirmation link!");
      // router.push('/')
      if(data.user===null){
        setIsOtpSent(true)
    }}
  };

  // verify otp
  const verifyOtp=async()=>{
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    const { data, error } = await superbase.auth.verifyOtp(
      {
        email: email,
        token: otp,
        type:"email"
      }
    );
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setSuccessMsg("otp verified!");
      console.log("dataa",data);
      if(data.user){
        dispatch(setUser({name:data.user.email?.split("@")[0],email:data.user.email,created_at:data.user.created_at}))
      }
      router.push('/')
    }
  }

  return userFromRedux?.email?<>{router.push('/')}</>: (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 tracking-tight">
          Sign In
        </h1>
        <p className="text-gray-500 mb-6 text-center">
          Welcome back! Please enter your credentials to sign in.
        </p>
        <div className="w-full flex flex-col gap-4">
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          {
            isOtpSent&&
            <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Enter otp"
            value={otp}
            
            onChange={(e) => setOtp(e.target.value)}
            autoComplete="current-password"
          />
          }
          <button
            onClick={isOtpSent?verifyOtp: signIN}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-lg shadow-md hover:from-indigo-600 hover:to-pink-600 transition disabled:opacity-50"
          >
            {isOtpSent ? "Sign in" : "send otp "}
          </button>
        </div>
        {errorMsg && (
          <div className="mt-4 w-full text-center text-red-500 font-medium">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="mt-4 w-full text-center text-green-600 font-medium">
            {successMsg}
          </div>
        )}
       
      </div>
    </div>
  );
};

export default Page;
