import { z } from "zod";
import { AmountSchema } from "./custom-validation";


export const transactionSchema = z.object({
  transaction_type: z.enum(["airtime", "data", "cable_tv", "electricity"]), // Adjust possible values if needed
  amount: AmountSchema,
  status: z.enum(["pending", "success", "failed"]), // Adjust possible statuses if needed
  reference: z.string().min(1, "Reference is required"),
  provider_response: z.string().optional(),
  user: z.number().int().nonnegative("User ID must be a non-negative integer"),
});