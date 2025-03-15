import React, { useState } from "react";
import DataPurchaseForm from "./dataPurchaseForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogModal } from "@/components/shared/dialogModal";
import { Button } from "@/components/ui/button";

const tabData = {
  Daily: [
    { bundle: "200MB", price: "₦150", duration: "1 day" },
    { bundle: "500MB", price: "₦200", duration: "1 day" },
    { bundle: "1GB", price: "₦300", duration: "1 day" },
    { bundle: "200MB", price: "₦150", duration: "1 day" },
    { bundle: "500MB", price: "₦200", duration: "1 day" },
    { bundle: "1GB", price: "₦300", duration: "1 day" },
    { bundle: "200MB", price: "₦150", duration: "1 day" },
    { bundle: "500MB", price: "₦200", duration: "1 day" },
    { bundle: "1GB", price: "₦300", duration: "1 day" },
  ],
  "2 weeks": [
    { bundle: "2GB", price: "₦1,500", duration: "2 weeks" },
    { bundle: "5GB", price: "₦3,000", duration: "2 weeks" },
    { bundle: "10GB", price: "₦5,000", duration: "2 weeks" },
  ],
  Monthly: [
    { bundle: "10GB", price: "₦5,000", duration: "1 month" },
    { bundle: "20GB", price: "₦9,000", duration: "1 month" },
    { bundle: "50GB", price: "₦20000", duration: "1 month" },
  ],
};

interface DataItem {
  bundle: string;
  price: string;
  duration: string;
}

interface DataTabProps {
  data: DataItem[];
  onCardClick: (bundle: string, price: string) => void;
}

const DataTab: React.FC<DataTabProps> = ({ data, onCardClick }) => (
  <div className="grid grid-cols-3 gap-4 mt-6">
    {data.map(({ bundle, price, duration }, index) => (
      <Card
        key={`${bundle}-${index}`}
        className="h-[100px] flex items-center p-3 rounded-[6px] cursor-pointer hover:bg-gray-100 transition"
        onClick={() => onCardClick(bundle, price)}
      >
        <CardContent className="flex flex-col justify-center">
          <h3 className="font-bold text-[#00005D] text-[22px]">{bundle}</h3>
          <p className="text-[12px] text-[#8A8AB9]">{duration}</p>
          <p className="text-[14px] text-[#8A8AB9]">{price}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

const DataCards = () => {
  const [selectedBundle, setSelectedBundle] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [amount, setAmount] = useState(""); // Fixed missing state
  const [phoneNumber, setPhoneNumber] = useState(""); // Fixed missing state
  const [error, setError] = useState<string | null>(null); // Fixed missing state
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const handleCardClick = (bundle: string, price: string) => {
    setSelectedBundle(bundle);
    setSelectedPrice(price);
    setAmount(price.replace("₦", "")); // Auto-fill amount field
    setIsPurchaseModalOpen(true);
  };

  const handlePurchase = () => {
    setIsPurchaseModalOpen(false);
    setIsCompleteModalOpen(true);
  };

  return (
    <div>
      <div className="flex">
        <main className="flex-1">
          <Tabs defaultValue="Daily">
            <TabsList className="grid grid-cols-3 bg-[#C2C2E0] rounded-[6px] p-1 w-max mt-4">
              {Object.keys(tabData).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="px-3 py-1 text-sm font-medium rounded-[6px] transition-colors data-[state=active]:bg-[#00005D] data-[state=active]:text-white text-black"
                >
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(tabData).map(([key, data]) => (
              <TabsContent key={key} value={key}>
                <DataTab data={data} onCardClick={handleCardClick} />
              </TabsContent>
            ))}
          </Tabs>
        </main>
        <aside className="w-64">
          <DataPurchaseForm />
        </aside>
      </div>

      {/* Payment Modal */}
      <DialogModal
        open={isPurchaseModalOpen} // Fixed missing variable
        setOpen={setIsPurchaseModalOpen}
        title="Complete Payment"
        showFooter={false}
      >
        <div className="flex flex-col">
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          {/* Amount Input */}
          <label className="block text-[14px] font-medium text-[#00005D] mb-1">
            Amount
          </label>
          <input
            type="text"
            placeholder="Enter Amount"
            className={`w-full p-2 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-blue-900 ${
              error ? "border-red-500" : ""
            }`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Phone Number Input */}
          <label className="block text-sm font-medium text-[#00005D] mt-3 mb-1">
            Phone number
          </label>
          <input
            type="number"
            placeholder="Enter Phone Number"
            className={`w-full p-2 border bg-white border-[#8A8AB9] rounded-[6px] outline-none text-[14px] focus:ring focus:ring-[#00005D] ${
              error ? "border-red-500" : ""
            }`}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              setError(null);
            }}
          />
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Button
            className="bg-gray-500"
            onClick={() => setIsPurchaseModalOpen(false)}
          >
            Cancel
          </Button>
          <Button className="bg-[#00005D] text-white" onClick={handlePurchase}>
            Purchase Data
          </Button>
        </div>
      </DialogModal>

      {/* Complete Purchase Modal */}
      <DialogModal
        open={isCompleteModalOpen}
        setOpen={setIsCompleteModalOpen}
        title="Data Purchase"
        showFooter={false}
      >
        <h2 className="text-xl font-bold text-center">{selectedBundle}</h2>
        <p>Product: MTN</p>
        <p>Amount: {selectedPrice}</p>
        <div className="flex flex-col mt-4">
          <Button className="bg-[#00005D] text-white">Complete Purchase</Button>
          <Button
            className="bg-red-600 mt-2"
            onClick={() => setIsCompleteModalOpen(false)}
          >
            Cancel Purchase
          </Button>
        </div>
      </DialogModal>
    </div>
  );
};

export default DataCards;
