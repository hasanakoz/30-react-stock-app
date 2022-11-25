import React from "react";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
// import { axiosWithToken } from "../service/axiosInstance";
import useAxios from "./useAxios";

const useStockCalls = () => {
  const dispatch = useDispatch();
  const { axiosWithToken } = useAxios();

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getFirms = () => getStockData("firms");
  const getSales = () => getStockData("sales");
  const getCategories = () => getStockData("categories");
  const getBrands = () => getStockData("brands");
  const getProducts = () => getStockData("products");
  const getPurchases = () => getStockData("purchases");

  //   const getFirms = async () => {
  //     const url = "firms";
  //     dispatch(fetchStart());
  //     try {
  //       const { data } = await axiosWithToken.get(`stock/firms/`);
  //       console.log(data);
  //       dispatch(getSuccess({ data, url }));
  //     } catch (error) {
  //       dispatch(fetchFail());
  //       console.log(error);
  //     }
  //   };

  const deleteStockData = async (url, id) => {
    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toastSuccessNotify(`${url} successfully deleted`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} cannot be deleted`);
    }
  };

  const deleteFirm = (id) => deleteStockData("firms", id);
  const deleteBrand = (id) => deleteStockData("brands", id);
  const deleteProduct = (id) => deleteStockData("products", id);

  const postStockData = async (info, url) => {
    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} successfully added`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} cannot be added`);
    }
  };

  const postFirm = (info) => postStockData(info, "firms");

  const putStockData = async (info, url) => {
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} successfully updated`);
      getStockData(url);
    } catch (error) {
      console.log(error);
      toastErrorNotify(`${url} cannot be updated`);
    }
  };

  const putFirm = (info) => putStockData(info, "firms");

  return {
    getFirms,
    getSales,
    deleteFirm,
    postFirm,
    putFirm,
    getBrands,
    getCategories,
    getProducts,
    deleteProduct,
    getPurchases,
  };
};

export default useStockCalls;
