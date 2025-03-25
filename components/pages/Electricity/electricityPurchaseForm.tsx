"use client";
import { ElectricityProvider } from "@/api/static-data";
import { DialogModal } from "@/components/shared/dialogModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CgSpinner } from "react-icons/cg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiWalletAlt } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

const Beneficiaries: string[] = [
  "9370-2343-2343-2343",
  "4821-2343-2343-2343",
  "6057-4564-2343-2343",
];

type PurchaseFormData = {
  amount: string;
  meterNumber: string;
  providerdata: ElectricityProvider | null;
};

export default function ElectricityPurchaseForm({
  provider,
}: {
  provider: ElectricityProvider | null;
}) {
  const [beneficiariesList, setBeneficiariesList] = useState(Beneficiaries);
  const [open, setOpen] = useState(false);
  const [datatosubmit, setDatatosubmit] = useState<PurchaseFormData>({
    amount: "",
    meterNumber: "",
    providerdata: null,
  });
  const wallet = 6500;
  const [completedPayment, setCompletePayment] = useState(false);
  const [ProcessingPayment, setProcessingPayment] = useState(false);
  const Router = useRouter();

  useEffect(() => {
    if (provider) {
      setDatatosubmit({ ...datatosubmit, providerdata: provider });
    }
  }, [provider]);

  const handlePayment = async () => {
    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
      setCompletePayment(true);
    }, 3000);
  };

  return (
    <>
      <div className="mx-4 mt-2 w-full max-w-md p-4 space-y-3">
        {/* Amount */}
        <div>
          <label className="block text-[14px] font-medium text-[#00005D] mb-1">
            Amount
          </label>
          <Input
            value={datatosubmit.amount}
            onChange={(e) => {
              setDatatosubmit({ ...datatosubmit, amount: e.target.value });
            }}
            placeholder="Enter Amount"
            className="w-full border-1 bg-white border-[#8A8AB9] outline-none text-[14px] h-[40px]"
          />
        </div>

        {/* Beneficiaries */}
        <div>
          <label className="block text-[14px] font-medium text-[#00005D] mb-1">
            Beneficiaries
          </label>
          <Select
            onValueChange={(value) => {
              setDatatosubmit({ ...datatosubmit, meterNumber: value });
            }}
          >
            <SelectTrigger className="w-full border-1 bg-white border-[#8A8AB9] outline-none h-[40px]">
              <SelectValue placeholder="select beneficiary" />
            </SelectTrigger>
            <SelectContent>
              {beneficiariesList.map((beneficiary) => (
                <SelectItem key={beneficiary} value={beneficiary}>
                  {beneficiary}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Meter Number */}
        <div>
          <label className="block text-sm font-medium text-[#00005D] mb-1">
            Meter Number
          </label>
          <Input
            placeholder="2343-2343-2343-2343"
            value={datatosubmit.meterNumber}
            onChange={(e) => {
              setDatatosubmit({ ...datatosubmit, meterNumber: e.target.value });
            }}
            className="w-full border-1 bg-white border-[#8A8AB9] outline-none text-[14px] h-[40px]"
          />
        </div>

        <Button
          className="w-full text-sm mt-4 bg-[#00005D] text-white font-medium py-2 rounded-[6px] hover:bg-blue-900"
          onClick={() => {
            setOpen(true);
          }}
          disabled={
            !datatosubmit.amount ||
            !datatosubmit.meterNumber ||
            !datatosubmit.providerdata
          }
        >
          Purchase Data
        </Button>
      </div>

      {/* Payment Confirmation & Completed Modal */}
      <DialogModal
        open={open}
        setOpen={() => {
          setCompletePayment(false);
          setOpen(!open);
        }}
        title=""
        showFooter={false}
      >
        {!completedPayment ? ( // Show confirmation UI before payment is successful
          <div className="space-y-3.5">
            <h6 className="text-indigo-950 text-base text-center font-medium leading-7">
              Electricity Bills
            </h6>

            <h5 className="text-center text-indigo-950 text-3xl leading-10">
              ₦{datatosubmit.amount}
            </h5>

            <div className="flex justify-between items-start px-3">
              <p className="text-indigo-950 text-base font-medium leading-7">
                Product :
              </p>
              <p className="text-indigo-950 text-sm font-medium leading-snug">
                {datatosubmit.providerdata?.id}
              </p>
            </div>

            <div className="flex justify-between px-5 py-2 bg-gray-100 rounded-[10px]">
              <div className="flex justify-start items-center gap-2.5 text-[#8A8AB9]">
                <BiWalletAlt size={20} />
                <div className="text-sm font-medium">wallet</div>
              </div>
              <div className="text-indigo-950 text-sm font-bold">
                : ₦{wallet}
              </div>
            </div>

            <div>
              <Button
                className="w-full text-sm mt-4 bg-[#00005D] text-white font-medium py-2 rounded-[6px] hover:bg-blue-900"
                onClick={handlePayment} // Trigger payment process
                disabled={
                  ProcessingPayment || Number(datatosubmit.amount) > wallet
                }
              >
                {ProcessingPayment ? (
                  <span className="flex items-center justify-center gap-2">
                    <CgSpinner className="animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Complete Payment"
                )}
              </Button>

              {Number(datatosubmit.amount) > wallet ? (
                <Button
                  className="w-full text-sm mt-4 bg-gray-500 text-white font-medium py-2 rounded-[6px] hover:bg-blue-900"
                  onClick={() => {
                    setOpen(false);
                    Router.push("/wallet");
                  }}
                >
                  Top up wallet
                </Button>
              ) : (
                <Button className="w-full text-sm mt-4 bg-gray-500 text-white font-medium py-2 rounded-[6px] hover:bg-blue-900">
                  Cancel payment
                </Button>
              )}
            </div>
          </div>
        ) : (
          // Show success UI after payment
          <div className="space-y-3.5 px-4">
            <div className="w-[70px] h-[70px] rounded-full bg-[#B0FFB0] flex items-center justify-center mx-auto">
              <FaCheck size={"33"} className="text-[#009900]" />
            </div>

            <h5 className="text-2xl text-indigo-950 text-center">
              Payment Successful
            </h5>

            <div>
              <hr className="bg-[#B0B0D0]" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-start px-3">
                <p className="text-indigo-950 text-base font-medium leading-7">
                  Product :
                </p>
                <p className="text-indigo-950 text-sm font-medium leading-snug">
                  {datatosubmit.providerdata?.id}
                </p>
              </div>
              <div className="flex justify-between items-start px-3">
                <p className="text-indigo-950 text-base font-medium leading-7">
                  Amount :
                </p>
                <p className="text-indigo-950 text-base font-bold leading-snug">
                  ₦{datatosubmit.amount}
                </p>
              </div>
            </div>

            <div className="px-2">
              <Button
                className="bg-[#009900] text-white hover:bg-[#009900] hover:text-white w-full"
                onClick={() => {
                  setOpen(false);
                  setCompletePayment(false); // Reset state for next transaction
                  setDatatosubmit({
                    amount: "",
                    meterNumber: "",
                    providerdata: null,
                  });
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogModal>
    </>
  );
}
