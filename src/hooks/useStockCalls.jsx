import React from "react";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import { axiosWithToken } from "../service/axiosInstance";

const useStockCalls = () => {
  const dispatch = useDispatch();

  const getStockData = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`stock/${url}/`);
      console.log(data);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const getFirms = () => getStockData("firms");
  const getSales = () => getStockData("sales");

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

  return { getFirms, getSales };
};

export default useStockCalls;
