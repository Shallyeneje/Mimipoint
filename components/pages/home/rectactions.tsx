import { Pencil, CheckCircle } from "lucide-react";

const recentActions = [
  { time: "4 Weeks, 5 days ago", action: "Your Profile was edited", type: "edit" },
  { time: "4 Weeks, 5 days ago", action: "Bought Airtime 9mobile of ₦400", type: "success" },
  { time: "4 Weeks, 5 days ago", action: "Deposited ₦2000 to Wallet", type: "success" },
  { time: "4 Weeks, 5 days ago", action: "Your Profile was edited", type: "edit" },
];

const RecentActions = () => {
  return (
    <div className="w-full max-w-md  rounded-lg p-4">
      <h2 className="text-xl font-bold text-[#00005D]">Recent actions</h2>
      <div className="relative border-l-4 border-gray-300 mt-4 pl-4 space-y-4">
        {recentActions.map((item, index) => (
          <div key={index} className="relative flex gap-3 items-start">
            {/* Timeline Icons */}
            <div className="absolute -left-7 flex items-center justify-center w-5 h-5 rounded-full bg-white border">
              {item.type === "edit" ? (
                <Pencil className="w-3 h-3 text-gray-500" />
              ) : (
                <CheckCircle className="w-3 h-3 text-green-600" />
              )}
            </div>

            {/* Action Content */}
            <div className="bg-white p-3 rounded-lg shadow-md w-full">
              <p className="text-[9px] text-[#8A8AB9]">{item.time}</p>
              <p className="text-[11px] text-[#00005D] font-medium pb-2.5">{item.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActions;
