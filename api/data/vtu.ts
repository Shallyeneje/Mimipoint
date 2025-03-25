import { useQuery } from "react-query";
import { Vtuinstance } from "../instance";
import { VTU_PASSWORD, VTU_USERNAME } from "../constants";

// get Airtime, Data, Cable, Electricity, Wallet

export const useVTU = async (endpoint: string) => {
  const { data } = await Vtuinstance.get(
    `/${endpoint}?username=${VTU_USERNAME}&password=${VTU_PASSWORD}`
  );
  return data;
};
