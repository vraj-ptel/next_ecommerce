"use client";
import Loading from "@/components/loadings/Loading";
import Product from "@/components/shared/Product";
import { UsegetAllProduct } from "@/lib/superbase/hooks/useSuperbase";
import { productType } from "@/types";
import Image from "next/image";
import React, { useEffect } from "react";
import i from "@/public/landing2.jpg"

const Page = () => {
  const { fetchData, fetchLoading, func } = UsegetAllProduct();
  useEffect(() => {
    func();
  }, []);

  return (
    <>
      {fetchLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-[84px] max-w-screen   min-h-screen overflow-y-hidden  flex flex-col items-center justify-center">
            <Image style={{maskImage:"linear-gradient(to bottom,rgba(0,0,0,1),rgba(0,0,0,0))"}} src={i} alt="landing"  className="w-full h-[40vw] object-cover" >

            </Image>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 relative -top-80 ">
              {fetchData?.length > 0 && (
                <>
                  {/* men's clothing */}
                  
                 
                    {fetchData
                      .filter((item) => item.category === "men's clothing")
                      .map((product: productType) => {
                        return (
                          <div key={product.id} className="">
                            <Product product={product} />
                          </div>
                        );
                      })}
                  
                  {/* electronics */}
                  
                  
                    {fetchData
                      .filter((item) => item.category === "electronics")
                      .map((product: productType) => {
                        return (
                          <div key={product.id} className="">
                            <Product product={product} />
                          </div>
                        );
                      })}
                 
                  {/* women's clothing */}
               
                  
                    {fetchData
                      .filter((item) => item.category === "women's clothing")
                      .map((product: productType) => {
                        return (
                          <div key={product.id} className="">
                            <Product product={product} />
                          </div>
                        );
                      })}
                 
                  {/* jewelry */}
                  
                 
                    {fetchData
                      .filter((item) => item.category === "jewelry")
                      .map((product: productType) => {
                        return (
                          <div key={product.id} className="">
                            <Product product={product} />
                          </div>
                        );
                      })}
                 
                </>
              )}

              {/* {fetchError && (
                <p className="text-red-500">Error: {fetchError.message}</p>
              )} */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
