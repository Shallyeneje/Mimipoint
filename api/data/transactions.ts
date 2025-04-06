import { TransactionCreate, WalletCreate } from "@/types/transaction";
import { AxiosinstanceAuth } from "../instance";
import { useQuery, useMutation, useQueryClient } from "react-query";

// --------------------------------------------------------
// Wallets Api
// --------------------------------------------------------
export const useGetWallets = () => {
  return useQuery("wallets", async () => {
    const response = await AxiosinstanceAuth.get("wallets/");
    return response.data;
  });
};

export const useGetWalletById = (id: string) => {
  return useQuery(["wallet", id], async () => {
    const response = await AxiosinstanceAuth.get(`wallets/${id}`);
    return response.data;
  });
};

export const useCreateWallet = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (wallet: WalletCreate) => {
      const response = await AxiosinstanceAuth.post("wallets/", wallet);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("wallets");
      },
    }
  );
}

export const useDeleteWallet = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const response = await AxiosinstanceAuth.delete(`wallets/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("wallets");
      },
    }
  );
}


// --------------------------------------------------------
// Transactions Api
// --------------------------------------------------------

export const useGetTransactions = () => {
  return useQuery("transactions", async () => {
    const response = await AxiosinstanceAuth.get("transactions/");
    return response.data;
  });
};


export const useGetTransactionById = (id: string) => {
  return useQuery(["transaction", id], async () => {
    const response = await AxiosinstanceAuth.get(`transactions/${id}`);
    return response.data;
  });
};

// verify transaction
export const useVerifyTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (reference: string) => {
      const response = await AxiosinstanceAuth.get(`transactions/verify/${reference}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
      },
    }
  );
}

// create transaction
export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (transaction: TransactionCreate) => {
      const response = await AxiosinstanceAuth.post("transactions/", transaction);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
      },
    }
  );
}

// delete transaction
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: string) => {
      const response = await AxiosinstanceAuth.delete(`transactions/${id}`);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
      },
    }
  );
}