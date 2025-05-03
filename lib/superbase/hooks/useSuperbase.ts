"use client";
import { useState } from "react";
import type { productType } from "../../../types";
import superbase from "../products";

// get all products from superbase
const UsegetAllProduct =  () => {
  const [fetchData, setFetchData] = useState<productType[]>([]);
  const [fetchError, setFetchError] = useState<unknown>(null);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const func=async ()=>{
    setFetchLoading(true);
    const { data, error } = await superbase.from("product").select("*");
    if (error) {
      console.error("Error fetching data:", error);
      setFetchError(error);
    }
    console.log("Data fetched successfully:", data);
    if (data) {
      setFetchData(data as productType[]);
    }
    setFetchLoading(false);
  }
  return {  fetchData,fetchError,fetchLoading,func};
};

// get filtered query products

const UsegetFilteredProducts = () => {
  const [fetchData, setFetchData] = useState<productType[]>([]);
  const [fetchError, setFetchError] = useState<unknown>(null);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const func = async (query: string) => {
    setFetchLoading(true);

    const { data, error } = await superbase
      .from("product")
      .select("*")
      .or(
        `title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`
      );
    // .ilike("title", `%${query}%`);
    if (error) {
      console.error("Error fetching data:", error);
      setFetchError(error);
    }
    console.log("Data fetched successfully:", data);
    if (data) {
      setFetchData(data as productType[]);
    }
    setFetchLoading(false);
  };
  return { fetchData, fetchError, fetchLoading,func };
};

const UsegetSingleProduct=()=>{
  const [fetchData, setFetchData] = useState<productType | null>(null);
  const [fetchError, setFetchError] = useState<unknown>(null);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);

  const func = async (id: string) => {
    setFetchLoading(true);
    const { data, error } = await superbase
      .from("product")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching data:", error);
      setFetchError(error);
    }
    console.log("Data fetched successfully:", data);
    if (data) {
      setFetchData(data as productType);
    }
    setFetchLoading(false);
  };
  return { fetchData, fetchError, fetchLoading, func };

}

export { UsegetAllProduct, UsegetFilteredProducts ,UsegetSingleProduct };
