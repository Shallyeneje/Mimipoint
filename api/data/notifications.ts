import { NotificationCreate, NotificationReadUpdate } from "@/types/notification";
import { AxiosinstanceAuth } from "../instance";
import { useQuery, useMutation, useQueryClient } from "react-query";

// Get User Unread Notifications
export const useGetUserUnreadNotifications = () => {
  return useQuery("userUnreadNotifications", async () => {
    const response = await AxiosinstanceAuth.get("notifications/user/unread");
    return response.data;
  });
};

// get all notifications
export const useGetAllNotifications = () => {
  return useQuery("notifications", async () => {
    const response = await AxiosinstanceAuth.get("notifications/all");
    return response.data;
  });
};

// Mark Notification as Read
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (notificationId: string) => {
      const response = await AxiosinstanceAuth.get(
        `notifications/${notificationId}/mark-as-read`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userUnreadNotifications");
      },
    }
  );
};

// create notification
export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (notification: NotificationCreate) => {
      const response = await AxiosinstanceAuth.post(
        "notifications/send_notification/",
        notification
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notifications");
      },
    }
  );
}
