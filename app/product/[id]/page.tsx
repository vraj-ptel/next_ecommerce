"use client"
import SingleProductLoading from '@/components/loadings/SingleProductLoading';
import SingleProductPage from '@/components/shared/SingleProductPage';
import { UsegetSingleProduct } from '@/lib/superbase/hooks/useSuperbase';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { IoMdArrowBack } from "react-icons/io";

const Page = () => {
    const {id}=useParams();
    const router=useRouter()
    const {fetchData,fetchLoading,func}=UsegetSingleProduct();
    console.log('fetchData',fetchData);
    useEffect(()=>{
        func(id as string);
    },[id,func])
  return (
    <div>
      {
        fetchLoading?<SingleProductLoading/>:<>
        <div className=" mt-[84px] flex flex-col items-center justify-center">
            
            <h1 className="text-2xl font-bold text-center flex mt-5 ">
                <span onClick={()=>{router.back()}} className='cursor-pointer'><IoMdArrowBack/> </span>
                <span className='px-3'>Product Details</span>
                </h1>
            <div className=" mt-4 ">
                {fetchData && (
                   <SingleProductPage product={fetchData}></SingleProductPage>
                )}
            </div>
            
        </div>
        </>

      }
    </div>
  )
}

export default Page
