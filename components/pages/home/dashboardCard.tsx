// components/DashboardCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, List, Megaphone } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description, icon }) => {
  return (
    <Card className="p-4 shadow-md">
      <CardHeader className="flex items-center gap-3">
        {icon}
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
