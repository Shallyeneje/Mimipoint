import React, { useEffect, useState } from "react";
import DataPurchaseForm from "./dataPurchaseForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogModal } from "@/components/shared/dialogModal";
import { Button } from "@/components/ui/button";
import { DataPlan, NetworkDataPlans } from "@/api/static-data";

interface DataTabProps {
  data: {
    [planName: string]: DataPlan;
  };
  onCardClick: (data: string, price: number) => void;
}

const DataTab: React.FC<DataTabProps> = ({ data, onCardClick }) => (
  <div className="grid grid-cols-3 gap-4 mt-6">
    {Object.values(data).map(({ data, price, duration }, index) => (
      <Card
        key={`${data}-${index}`}
        className="h-[100px] flex items-center p-3 rounded-[6px] cursor-pointer hover:bg-gray-100 transition"
        onClick={() => onCardClick(data, price)}
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
  const [selectedBundle, setSelectedBundle] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("");

  // Update the tab when the data to sc
  useEffect(() => {
    if (datatoshow && Object.keys(datatoshow).length > 0) {
      setActiveTab(Object.keys(datatoshow)[0]);
    }
  }, [datatoshow]);

  const handleCardClick = (bundle: string, price: number) => {
    setSelectedBundle(bundle);
    setSelectedPrice(price);
    setAmount(price.toString());
    setIsPurchaseModalOpen(true);
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
      setIsCompleteModalOpen(true);
    }
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
        <aside className="w-64">
          <DataPurchaseForm />
        </aside>
      </div>

      <DialogModal
        open={isPurchaseModalOpen}
        setOpen={setIsPurchaseModalOpen}
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
    </div>
  );
};

export default DataCards;
