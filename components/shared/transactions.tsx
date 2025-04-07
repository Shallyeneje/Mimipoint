"use client";
import { ArrowLeftRight } from "lucide-react";
import moment from "moment";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CgSpinner } from "react-icons/cg";
import { TransactionResponse } from "@/types/transaction";
import { useGetTransactions } from "@/api/data/transactions";
import { usePathname } from "next/navigation";

// Transaction interface

export default function Transactions() {
  const { data: transactions, isLoading: loading } = useGetTransactions() as {
    data: TransactionResponse[];
    isLoading: boolean;
  };
  const pathname = usePathname();

  return (
    <div>
      {/* Title */}

      {pathname.replace(/\/$/, "") !== "/transactions" && (
        <div className="flex  gap-3 text-[#00005D] mb-2.5 ">
          <span className="">
            <ArrowLeftRight size={22} className="text-[#00005D] " />{" "}
          </span>
          <h6 className="text-2xl font-bold text-[#00005D] flex items-center gap-2 ">
            Transactions
          </h6>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <div className="flex gap-2 items-center justify-center">
            <CgSpinner className="animate-spin" size={20} />
            <p className="text-center text-gray-500">Loading transactions...</p>
          </div>
        ) : (
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-[#EFEFF5] text-[#00005D] ">
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">
                  S/N
                </TableHead>
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">
                  Type
                </TableHead>
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">
                  Amount
                </TableHead>
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">
                  Reference
                </TableHead>
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">
                  Status
                </TableHead>
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <TableRow
                    key={transaction.id}
                    className="border-b  text-[14px] text-[#414189] "
                  >
                    <TableCell className="p-3 text-[14px] text-[#00005D] font-bold">
                      {transaction.id}
                    </TableCell>
                    <TableCell className="p-3 ">
                      {transaction.transaction_type}
                    </TableCell>
                    <TableCell className="p-3">{transaction.amount}</TableCell>
                    <TableCell className="p-3">
                      {transaction.reference}
                    </TableCell>
                    <TableCell className="p-3 font-bold">
                      <Badge
                        className={`text-white px-3 py-1 rounded-full ${
                          transaction.status === "success"
                            ? "bg-[#D9FFD9] text-[#009900]"
                            : transaction.status === "pending"
                            ? "bg-[#FFF5EB] text-[#E88B2E]"
                            : "bg-[#FFE6E6] text-[#B50000]"
                        }`}
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="p-3">
                      {transaction.created_at
                        ? moment(transaction.created_at).format("MMM DD YYYY")
                        : "Not Provided"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="text-[#414189]">
                  <TableCell className="p-3 text-center" colSpan={6}>
                    No transaction data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
