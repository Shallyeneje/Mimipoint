"use client";
import { ArrowLeftRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Transaction interface
interface Transaction {
  id: number;
  type: string;
  details: string;
  amount: string;
  reference: string;
  status: "success" | "pending" | "failed";
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API response with a delay
    setTimeout(() => {
      const mockData: Transaction[] = [
        {
          id: 98,
          type: "Data",
          details: "500mb MTN CG lite Purchase",
          amount: "₦400",
          reference: "17302828682127038",
          status: "success",
        },
        {
          id: 97,
          type: "Airtime",
          details: "1000 Airtime Airtel CG lite Purchase",
          amount: "₦1000",
          reference: "173028167969527038",
          status: "success",
        },
        {
          id: 96,
          type: "Data",
          details: "5Gb MTN CG lite Purchase",
          amount: "₦1500",
          reference: "17302828682127038",
          status: "pending",
        },
        {
          id: 95,
          type: "Data",
          details: "1500mb 9mobile Purchase",
          amount: "₦900",
          reference: "17302828682127038",
          status: "success",
        },
        {
          id: 94,
          type: "Data",
          details: "500mb MTN CG lite Purchase",
          amount: "₦400",
          reference: "17302828682127038",
          status: "success",
        },
        {
          id: 93,
          type: "Data",
          details: "500mb MTN CG lite Purchase",
          amount: "₦400",
          reference: "17302828682127038",
          status: "failed",
        },
        {
          id: 92,
          type: "Data",
          details: "500mb MTN CG lite Purchase",
          amount: "₦400",
          reference: "17302828682127038",
          status: "success",
        },
      ];
      setTransactions(mockData);
      setLoading(false);
    }, 1500); // Simulate network delay
  }, []);

  return (
    <div className="p-6">
      {/* Title */}

      <div className="flex  gap-3 text-[#00005D] mb-2.5 ">
        <span className="">
          <ArrowLeftRight size={22} className="text-[#00005D] " />{" "}
        </span>
        <h6 className="text-2xl font-bold text-[#00005D] flex items-center gap-2 ">
          Transactions
        </h6>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading transactions...</p>
        ) : (
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-[#EFEFF5] text-[#00005D] ">
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">S/N</TableHead>
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">Type</TableHead>
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">Details</TableHead>
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">Amount</TableHead>
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">Reference</TableHead>
                <TableHead className="p-3 text-[14px] text-[#00005D] font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow
                  key={transaction.id}
                  className="border-b  text-[14px] text-[#414189] "
                >
                  <TableCell className="p-3 text-[14px] text-[#00005D] font-bold">{transaction.id}</TableCell>
                  <TableCell className="p-3 ">{transaction.type}</TableCell>
                  <TableCell className="p-3">{transaction.details}</TableCell>
                  <TableCell className="p-3">{transaction.amount}</TableCell>
                  <TableCell className="p-3">{transaction.reference}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
