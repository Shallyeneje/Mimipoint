import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  cableTvPackages,
  CableTvProviders,
  CableTvPackages,
} from "@/api/static-data";

type BundleProps = {
  key: string;
  name: string;
};

// Reusable component for displaying bundle cards
const BundleCard = ({
  data,
  setSelectedBundle,
}: {
  data: { key: string; name: string }[];
  setSelectedBundle: React.Dispatch<React.SetStateAction<BundleProps | null>>;
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-2">
    {data.map(({ key, name }, index) => (
      <Card
        key={index}
        className="p-2 sm:p-2 py-4 rounded-[6px] cursor-pointer shadow-sm hover:shadow-lg transition"
        onClick={() => setSelectedBundle({ key, name })}
      >
        <CardContent className="text">
          {/* Responsive Title */}
          <h5 className="font-bold text-[#00005D] text-base">{name}</h5>

          {/* Responsive Badge */}
          <div className="text-[10px] sm:text-[8px] mx-auto w-14 sm:w-12 bg-[#FFE5B4] text-[#D97706] px-0.5 py-0.5 rounded-full inline-block text-center">
            1 month
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const BundleTabs = ({
  selectedProvider,
  setSelectedBundle,
}: {
  selectedProvider: CableTvProviders;
  setSelectedBundle: React.Dispatch<React.SetStateAction<BundleProps | null>>;
}) => {
  // Convert provider data to an array format
  const providerData = Object.entries(cableTvPackages[selectedProvider]).map(
    ([key, name]) => ({ key, name })
  );

  return (
    <div className="space-y-3">
      {/* Render selected provider data */}
      <h6 className="font-bold mt-3">
        <span className="uppercase">{selectedProvider}</span> Cable Variants
      </h6>
      <BundleCard data={providerData} setSelectedBundle={setSelectedBundle} />
    </div>
  );
};

export default BundleTabs;
