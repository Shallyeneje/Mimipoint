import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabData = {
  HotOffers: [
    { bundle: "GOtv Smallie", Amount: "₦1900", duration: "1 Month" },
    { bundle: "GOtv Jinja", Amount: "₦3900", duration: "1 Month" },
    { bundle: "GOtv Jolli", Amount: "₦5800", duration: "1 Month" },
    { bundle: "GOtv Max", Amount: "₦8500", duration: "1 Month" },
    { bundle: "GOtv Supa", Amount: "₦11400", duration: "1 Month" },
    { bundle: "GOtv Supa+", Amount: "₦16800", duration: "1 Month" },
  ],
  Monthly: [
    { bundle: "GOtv Smallie", Amount: "₦1900", duration: "1 Month" },
    { bundle: "GOtv Jinja", Amount: "₦3900", duration: "1 Month" },
    { bundle: "GOtv Jolli", Amount: "₦5800", duration: "1 Month" },
    { bundle: "GOtv Max", Amount: "₦8500", duration: "1 Month" },
    { bundle: "GOtv Supa", Amount: "₦11400", duration: "1 Month" },
    { bundle: "GOtv Supa+", Amount: "₦16800", duration: "1 Month" },
  ],
  Yearly: [
    { bundle: "GOtv Smallie", Amount: "₦19000", duration: "1 year" },
    { bundle: "GOtv Jinja", Amount: "₦39000", duration: "1 year" },
    { bundle: "GOtv Jolli", Amount: "₦58000", duration: "1 year" },
    { bundle: "GOtv Max", Amount: "₦85000", duration: "1 year" },
    { bundle: "GOtv Supa", Amount: "₦114000", duration: "1 year" },
    { bundle: "GOtv Supa+", Amount: "₦160800", duration: "1 year" },
  ],
};

// Reusable component for tab content
const DataTab = ({
  data,
  setSelectedBundle,
}: {
  data: { bundle: string; Amount: string; duration: string }[];
  setSelectedBundle: (bundle: { bundle: string; Amount: string }) => void;
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2 mt-6">
    {data.map(({ bundle, Amount, duration }, index) => (
      <Card
        key={index}
        className="h-[100px] sm:h-[80px] flex items-center p-4 sm:p-2 rounded-[6px] cursor-pointer shadow-sm hover:shadow-lg transition"
        onClick={() => setSelectedBundle({ bundle, Amount })}
      >
        <CardContent className="flex flex-col justify-center text-center w-full">
          {/* Responsive Title */}
          <h3 className="font-bold text-[#00005D] text-xl sm:text-lg">
            {bundle}
          </h3>

          {/* Responsive Badge */}
          <div className="text-[10px] sm:text-[8px] mx-auto w-14 sm:w-12 bg-[#FFE5B4] text-[#D97706] px-0.5 py-0.5 rounded-full inline-block">
            {duration}
          </div>

          {/* Responsive Amount */}
          <p className="text-[14px] sm:text-[12px] text-[#8A8AB9]">{Amount}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

const BundleTabs = ({
  setSelectedBundle,
}: {
  setSelectedBundle: (bundle: { bundle: string; Amount: string }) => void;
}) => {
  return (
    <div>
      <Tabs defaultValue="HotOffers" className="w-max">
        <TabsList className="grid grid-cols-3 bg-[#C2C2E0] rounded-[6px] p-1 w-max mt-4">
          {Object.keys(tabData).map((key) => (
            <TabsTrigger
              key={key}
              value={key}
              className="px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-[6px] transition-colors 
              data-[state=active]:bg-[#00005D] data-[state=active]:text-white text-black"
            >
              {key}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(tabData).map(([key, data]) => (
          <TabsContent key={key} value={key}>
            <DataTab data={data} setSelectedBundle={setSelectedBundle} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BundleTabs;
