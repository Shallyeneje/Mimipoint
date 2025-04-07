import { useGetUserActivitiesById } from "@/api/data/users";
import { ActivityResponse } from "@/types/user";
import { useUser } from "@clerk/nextjs";
import { CgSpinner } from "react-icons/cg";
import { HiPencil } from "react-icons/hi";
import { MdCheckCircle, MdPendingActions } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import moment from "moment";

const RecentActions = () => {
  const { user } = useUser();
  const { data: userActivities, isLoading } = useGetUserActivitiesById(
    user?.id as string
  ) as {
    data: ActivityResponse[];
    isLoading: boolean;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md rounded-lg p-4 pt-9">
        <div className="flex items-center justify-center gap-2">
          <CgSpinner size={22} className="animate-spin" />
          Loading recent actions...
        </div>
      </div>
    );
  }

  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case "update":
        return <HiPencil size={15} className="text-gray-500" />;
      case "create":
        return <MdCheckCircle size={15} className="text-green-600" />;
      case "delete":
        return <FaTrashCan size={12} className="text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md  rounded-lg p-4">
      <h2 className="text-xl font-bold text-[#00005D]">Recent actions</h2>
      {userActivities?.length > 0 ? (
        <div className="relative border-l-4 border-gray-300 mt-4 pl-4 space-y-4">
          {userActivities?.slice(0, 10).map((activity) => (
            <div key={activity.id} className="relative flex gap-3 items-start">
              {/* Timeline Icons */}
              <div className="absolute -left-7 grid place-items-center w-6 h-6 rounded-full bg-white border">
                {getActivityIcon(activity.activity_type!)}
              </div>

              {/* Action Content */}
              <div className="bg-white p-3 rounded-lg shadow-md w-full">
                <p className="text-[9px] text-[#8A8AB9]">
                  {moment(activity.created_at).fromNow()}
                </p>
                <p className="text-[11px] text-[#00005D] font-medium pb-2.5">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 h-[250px] w-full bg-white my-4 rounded-lg shadow-md p-4 text-sm">
          <div className="flex justify-center items-center w-11 h-11 rounded-full bg-[#F0F0F5] mb-2">
            <MdPendingActions size={24} className="mb-2" />
          </div>
          No recent actions found.
        </div>
      )}
    </div>
  );
};

export default RecentActions;
