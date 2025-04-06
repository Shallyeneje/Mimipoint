import { ComplaintCreate } from "@/types/complaints";
import { AxiosinstanceAuth } from "../instance";
import { useQuery, useMutation, useQueryClient } from "react-query";


// --------------------------------------------------------
//  Complaints Api
// --------------------------------------------------------
export const useGetComplaints = () => {
  return useQuery("complaints", async () => {
    const response = await AxiosinstanceAuth.get("complaints/");
    return response.data;
  });
};

export const useGetComplaintById = (id: string) => {
  return useQuery(["complaint", id], async () => {
    const response = await AxiosinstanceAuth.get(`complaints/${id}`);
    return response.data;
  });
};

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (complaint: ComplaintCreate) => {
      const response = await AxiosinstanceAuth.post("complaints/", complaint);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("complaints");
      },
    }
  );
};

export const useDeleteComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const response = await AxiosinstanceAuth.delete(`complaints/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("complaints");
      },
    }
  );
};