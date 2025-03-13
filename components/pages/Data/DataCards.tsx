import React, { useState } from "react";
import DataPurchaseForm from "./dataPurchaseForm";
import DataTransactions from "./dataTransactions";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabData = {
  Daily: [
    { bundle: "200MB", pay: "₦150/1day" },
    { bundle: "500MB", pay: "₦200/1day" },
    { bundle: "1GB", pay: "₦300/1day" },
    { bundle: "200MB", pay: "₦150/1day" },
    { bundle: "500MB", pay: "₦200/1day" },
    { bundle: "1GB", pay: "₦300/1day" },
    { bundle: "200MB", pay: "₦150/1day" },
    { bundle: "500MB", pay: "₦200/1day" },
    { bundle: "1GB", pay: "₦300/1day" },
  ],
  "2 weeks": [
    { bundle: "2GB", pay: "₦1,500/14days" },
    { bundle: "5GB", pay: "₦3,000/14days" },
    { bundle: "10GB", pay: "₦5,000/14days" },
  ],
  Monthly: [
    { bundle: "10GB", pay: "₦5,000/30days" },
    { bundle: "20GB", pay: "₦9,000/30days" },
    { bundle: "50GB", pay: "₦20,000/30days" },
  ],
};
// Reusable component for tab content
const DataTab = ({ data }: { data: { bundle: string; pay: string }[] }) => (
  <div className="grid grid-cols-3 gap-4 mt-6">
    {data.map(({ bundle, pay }, index) => (
      <Card
        key={`${bundle}-${index}`}
        className="h-[100px] flex items-center p-4 rounded-[6px]"
      >
        <CardContent className="flex flex-col justify-center">
          <h3 className="font-bold text-[#00005D] text-2xl">{bundle}</h3>
          <p className="text-[14px] text-[#8A8AB9]">{pay}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

const DataCards = () => {
  const [clicked, setClicked] = useState("daily");
  return (
    <div>
      
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 ">
          {/* Service Buttons */}
          <Tabs defaultValue="Daily" className="">
            <TabsList className="grid grid-cols-3 bg-[#C2C2E0] rounded-[6px] p-1 w-max mt-4">
              {Object.keys(tabData).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-[6px] transition-colors data-[state=active]:bg-[#00005D] data-[state=active]:text-white text-black"
                >
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(tabData).map(([key, data]) => (
              <TabsContent key={key} value={key}>
                <DataTab data={data} />
              </TabsContent>
            ))}
          </Tabs>
        </main>
        {/* Sidebar: Purchase Airtime */}
        <aside className="w-64 ">
          <DataPurchaseForm />
        </aside>
      </div>
      <div className="mt-10">
        <DataTransactions />
      </div>
    </div>
  );
};

export default DataCards;
