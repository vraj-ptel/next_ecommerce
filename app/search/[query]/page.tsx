"use client";
import Loading from "@/components/loadings/Loading";
import Product from "@/components/shared/Product";
import { UsegetFilteredProducts } from "@/lib/superbase/hooks/useSuperbase";
import { productType } from "@/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { query } = useParams();
  const { fetchData, fetchLoading, func } =
    UsegetFilteredProducts();

  useEffect(() => {
    func(query as string);
  }, [func, query]);

  return (
    <>
      {fetchLoading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-[84px] flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-center">
              search result for - {query}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 ">
              {fetchData?.length > 0 ? (
                fetchData.map((product: productType) => (
                  <div key={product.id} className="">
                    <Product product={product} />
                  </div>
                ))
              ) : (
                <p>No results found for - {query}</p>
              )}
            </div>
            {/* {fetchError && (
              <p className="text-red-500">Error: {fetchError.message}</p>
            )} */}
          </div>
        </>
      )}
    </>
  );
};

export default Page;
