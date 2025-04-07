import {
  EasybuyChangeSubscriptionPlan,
  EasybuyChangeSubscriptionStatus,
  EasybuyPlanCreate,
  EasybuySubscriptionCreate,
  ProductCreate,
} from "@/types/easybuy";
import { AxiosinstanceAuth } from "../instance";
import { useQuery, useMutation, useQueryClient } from "react-query";

// --------------------------------------------------------
//  Product Api
// --------------------------------------------------------
export const useGetProducts = () => {
  return useQuery("products", async () => {
    const response = await AxiosinstanceAuth.get("easybuy/products/");
    return response.data;
  });
};

export const useGetProductById = (id: string) => {
  return useQuery(["product", id], async () => {
    const response = await AxiosinstanceAuth.get(`easybuy/products/${id}`);
    return response.data;
  });
};

export const useGetUserProducts = () => {
  return useQuery(["userProducts"], async () => {
    const response = await AxiosinstanceAuth.get(`easybuy/products/user`);
    return response.data;
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (product: ProductCreate) => {
      const response = await AxiosinstanceAuth.post(
        "easybuy/products/",
        product
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};

type ProductUpdate = {
  id: string;
  data: ProductUpdate;
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, data }: ProductUpdate) => {
      const response = await AxiosinstanceAuth.put(
        `easybuy/products/${id}`,
        data
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const response = await AxiosinstanceAuth.delete(`easybuy/products/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};

// --------------------------------------------------------
//  Easybuy plan Api
// --------------------------------------------------------
export const useGetPlans = () => {
  return useQuery("plans", async () => {
    const response = await AxiosinstanceAuth.get("easybuy/plans/");
    return response.data;
  });
};

export const useGetPlanById = (id: string) => {
  return useQuery(["plan", id], async () => {
    const response = await AxiosinstanceAuth.get(`easybuy/plans/${id}`);
    return response.data;
  });
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (plan: EasybuyPlanCreate) => {
      const response = await AxiosinstanceAuth.post("easybuy/plans/", plan);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("plans");
      },
    }
  );
};

type PlanUpdate = {
  id: string;
  data: EasybuyPlanCreate;
};
export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, data }: PlanUpdate) => {
      const response = await AxiosinstanceAuth.put(`easybuy/plans/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (_data, { id }) => {
        queryClient.invalidateQueries(["plan", id]);
      },
    }
  );
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const response = await AxiosinstanceAuth.delete(`easybuy/plans/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("plans");
      },
    }
  );
};

// --------------------------------------------------------
//  Easybuy subscription Api
// --------------------------------------------------------

export const useGetSubscriptions = () => {
  return useQuery("subscriptions", async () => {
    const response = await AxiosinstanceAuth.get("easybuy/subscriptions/");
    return response.data;
  });
};

export const useGetSubscriptionById = (id: string) => {
  return useQuery(["subscription", id], async () => {
    const response = await AxiosinstanceAuth.get(`easybuy/subscriptions/${id}`);
    return response.data;
  });
};

// renew subscription
export const renewSubscription = async (subscription_id: string) => {
  const response = await AxiosinstanceAuth.get(
    `easybuy/subscriptions/renew_subscription/${subscription_id}`
  );
  return response.data;
};

// create subscription
export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (subscription: EasybuySubscriptionCreate) => {
      const response = await AxiosinstanceAuth.post(
        "easybuy/subscriptions/",
        subscription
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subscriptions");
      },
    }
  );
};

export const useUpdateSubscriptionPlan = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (subscription: EasybuyChangeSubscriptionPlan) => {
      const response = await AxiosinstanceAuth.post(
        `easybuy/subscriptions/update_plan`,
        subscription
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subscriptions");
      },
    }
  );
};

export const useUpdateSubscriptionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (subscription: EasybuyChangeSubscriptionStatus) => {
      const response = await AxiosinstanceAuth.post(
        `easybuy/subscriptions/update_status`,
        subscription
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subscriptions");
      },
    }
  );
};

// delete/cancel subscription
export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const response = await AxiosinstanceAuth.delete(
        `easybuy/subscriptions/${id}`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("subscriptions");
      },
    }
  );
};
