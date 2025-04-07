import { useQuery, useMutation, useQueryClient } from "react-query";
import { Axiosinstance, AxiosinstanceAuth } from "../instance";
import { UserCreate, UserUpdate } from "@/types/user";

export const useGetUsers = () => {
  return useQuery("users", async () => {
    const response = await AxiosinstanceAuth.get("users/");
    return response.data;
  });
};

export const useGetUserById = (id: string) => {
  return useQuery(["user", id], async () => {
    const response = await Axiosinstance.get(`users/user_by_id/${id}`);
    return response.data;
  });
};

export const useGetUserByEmail = (email: string) => {
  return useQuery(
    ["user", email],
    async () => {
      const response = await Axiosinstance.get(`users/user_by_email/${email}`);
      return response.data;
    },
    {
      enabled: !!email,
    }
  );
};

// get user token by id
export const getUserTokenByEmail = async (email: string) => {
  const response = await Axiosinstance.get(`users/token/${email}`);
  return response.data;
};

// get user activities by id
export const useGetUserActivitiesById = (id: string) => {
  return useQuery(
    ["user", id],
    async () => {
      const response = await AxiosinstanceAuth.get(`users/activity`);
      return response.data;
    },
    {
      enabled: !!id,
    }
  );
};

// create user
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (user: UserCreate) => {
      const response = await Axiosinstance.post("users/", user);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};

// delete user
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (user_id: string) => {
      const response = await Axiosinstance.delete(`users/${user_id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
};

// update user
interface UpdateUserPayload {
  user: UserUpdate;
  user_id: string;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user, user_id }: UpdateUserPayload) => {
      const response = await AxiosinstanceAuth.patch(`/users/${user_id}`, user);
      return response.data;
    },
    onSuccess: (_data, { user_id }) => {
      queryClient.invalidateQueries(["user", user_id]);
    },
  });
};
