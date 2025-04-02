import { Axiosinstance } from "../instance";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useGetTransactions = () => {
  return useQuery("transactions", async () => {
    const response = await Axiosinstance.get("transactions");
    return response.data;
  });
};
