import { ReactNode } from "react";

interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, title, subtitle, description }) => {
  return (
    <div className="max-w-[439px] mt-10 space-y-2">
      <h2 className="text-sm font-bold flex items-center gap-2">
        {icon} {title}
      </h2>
      <h1 className="text-4xl font-bold text-[#00005D]">{subtitle}</h1>
      <p className="text-[16px] font-medium text-[#333385]">{description}</p>
    </div>
  );
};

export default PageHeader;
