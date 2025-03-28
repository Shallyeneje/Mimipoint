import React, { useEffect, useState } from "react";
import DataPurchaseForm from "./dataPurchaseForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogModal } from "@/components/shared/dialogModal";
import { Button } from "@/components/ui/button";
import { DataPlan, NetworkDataPlans } from "@/api/static-data";
import toast from "react-hot-toast";
import { BiWalletAlt } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";

interface DataTabProps {
  data: {
    [planName: string]: DataPlan;
  };
  onCardClick: (bundleID: string, data: string, price: number) => void;
}

const DataTab: React.FC<DataTabProps> = ({ data, onCardClick }) => (
  <div className="grid grid-cols-4 gap-4 mt-6">
    {Object.entries(data).map(([key, { data, price, duration }]) => (
      <Card
        key={key}
        className="h-[100px] flex items-center p-3 rounded-[6px] cursor-pointer hover:bg-gray-100 transition"
        onClick={() => onCardClick(key, data, price)}
      >
        <CardContent className="flex flex-col justify-center">
          <h3 className="font-bold text-[#00005D] text-[22px]">{data}</h3>
          <p className="text-[12px] text-[#8A8AB9]">{duration}</p>
          <p className="text-[14px] text-[#8A8AB9]">₦{price}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

const DataCards = ({ datatoshow }: { datatoshow: NetworkDataPlans | null }) => {
  const [bundleID, setBundleID] = useState("");
  const [bundle, setBundle] = useState("");
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amountError, setAmountError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsComfirmationModalOpen] = useState(false);
  const [processing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const wallet = 6500;

  const Router = useRouter();

  // Update the tab when the data to sc
  useEffect(() => {
    if (datatoshow && Object.keys(datatoshow).length > 0) {
      setActiveTab(Object.keys(datatoshow)[0]);
    }
  }, [datatoshow]);

  const handleCardClick = (bundleID: string, bundle: string, price: number) => {
    setBundleID(bundleID);
    setBundle(bundle);
    setAmount(price.toString());
    setIsPurchaseModalOpen(true);
  };

  const handleReset = () => {
    setAmount("");
    setBundleID("");
    setBundle("");
    setPhoneNumber("");
    setIsProcessing(false);
    setIsComfirmationModalOpen(false);
  };

  const validateInputs = () => {
    let isValid = true;

    if (!amount) {
      setAmountError("Amount is required.");
      isValid = false;
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setAmountError("Enter a valid amount.");
      isValid = false;
    }

    if (!phoneNumber) {
      setPhoneError("Phone number is required.");
      isValid = false;
    } else if (!/^\d{10,11}$/.test(phoneNumber)) {
      setPhoneError("Enter a valid 10 or 11-digit phone number.");
      isValid = false;
    }

    if (isValid) {
      setIsPurchaseModalOpen(false);
      setIsComfirmationModalOpen(true);
    }
  };

  const handleDataPurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      toast.success("Data Purchase was Successful");
      handleReset();
    }, 3000);
  };

  return (
    <div>
      <div className="md:flex">
        <main className="flex-1">
          {datatoshow && (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-white rounded mt-4 px-1 py-1">
                {Object.keys(datatoshow).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="px-5 py-1 rounded-sm text-sm font-medium transition-colors data-[state=active]:bg-[#00005D] data-[state=active]:text-white text-black"
                  >
                    {key}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(datatoshow).map(([key, data]) => (
                <TabsContent key={key} value={key}>
                  <DataTab data={data} onCardClick={handleCardClick} />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </main>
        {/* <aside className="w-64">
          <DataPurchaseForm />
        </aside> */}
      </div>

      <DialogModal
        open={isPurchaseModalOpen}
        setOpen={() => {
          handleReset();
          setIsPurchaseModalOpen(!isPurchaseModalOpen);
        }}
        title="Complete Payment"
        showFooter={false}
      >
        <div className="flex flex-col">
          <label className="block text-[14px] font-medium text-[#00005D] mb-1">
            Amount
          </label>
          <input
            type="text"
            placeholder="Enter Amount"
            className={`w-full p-2 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900 ${
              amountError ? "border-red-500" : ""
            }`}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (amountError) setAmountError(null);
            }}
          />
          {amountError && (
            <p className="text-red-600 text-sm mt-1">{amountError}</p>
          )}
          <label className="block text-sm font-medium text-[#00005D] mt-3 mb-1">
            Phone number
          </label>
          <input
            type="number"
            placeholder="Enter Phone Number"
            className={`w-full p-2 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-[#00005D] ${
              phoneError ? "border-red-500" : ""
            }`}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (phoneError) setPhoneError(null);
            }}
          />
          {phoneError && (
            <p className="text-red-600 text-sm mt-1">{phoneError}</p>
          )}
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button
            className="bg-gray-500"
            onClick={() => setIsPurchaseModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#00005D] text-white"
            onClick={validateInputs}
            disabled={!amount || !phoneNumber}
          >
            Purchase Data
          </Button>
        </div>
      </DialogModal>

      {/* Confirmation Modal */}
      <DialogModal
        open={isConfirmationModalOpen}
        setOpen={() => {
          handleReset();
          setIsComfirmationModalOpen(!isConfirmationModalOpen);
        }}
        title=""
        showFooter={false}
      >
        <div>
          <h3 className="text-indigo-950 text-base text-center font-medium leading-7">
            Payment Summary
          </h3>
          <h2 className="text-center text-indigo-950 text-3xl leading-10">
            ₦{amount}
          </h2>
        </div>

        <div>
          <div className="flex justify-between items-start px-3">
            <p className="text-indigo-950 text-base font-medium leading-7">
              BundleID :
            </p>
            <p className="text-indigo-950 text-sm font-medium leading-snug">
              {bundleID}
            </p>
          </div>

          <div className="flex justify-between items-start px-3">
            <p className="text-indigo-950 text-base font-medium leading-7">
              Bundle :
            </p>
            <p className="text-indigo-950 text-sm font-medium leading-snug">
              {bundle}
            </p>
          </div>

          <div className="px-3 flex justify-between">
            <p className="text-indigo-950 text-base font-medium leading-7">
              Phone :
            </p>
            <p className="text-indigo-950 text-sm font-medium leading-snug">
              {phoneNumber}
            </p>
          </div>
        </div>

        <div className="flex justify-between px-5 py-2 bg-gray-100 rounded-[10px]">
          <div className="flex justify-start items-center gap-2.5 text-[#8A8AB9]">
            <BiWalletAlt size={20} />
            <div className="text-sm font-medium">wallet</div>
          </div>
          <div className="text-indigo-950 text-sm font-bold">: ₦{wallet}</div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <Button
            className="bg-[#00005D] text-white w-full"
            onClick={() => handleDataPurchase()}
            disabled={processing || Number(amount) > wallet}
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <CgSpinner className="animate-spin" />
                Processing...
              </span>
            ) : (
              "Complete Payment"
            )}
          </Button>

          {Number(amount) > wallet ? (
            <Button
              className="w-full text-sm bg-[#00005D] text-white font-medium py-2 rounded-[6px] cursor-pointer"
              onClick={() => {
                setIsComfirmationModalOpen(false);
                Router.push("/wallet");
              }}
            >
              Top up wallet
            </Button>
          ) : (
            <Button
              className="w-full text-sm bg-red-600 text-white font-medium py-2 rounded-[6px] hover:bg-red-600"
              onClick={() => {
                handleReset();
                setIsComfirmationModalOpen(false)
              }}
            >
              Cancel payment
            </Button>
          )}
        </div>
      </DialogModal>
    </div>
  );
};

export default DataCards;
