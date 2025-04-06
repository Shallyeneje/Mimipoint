// types/notification.ts

export interface NotificationBase {
  sender_id?: string | null; // UUID
  title: string;
  message: string;
}

export type NotificationCreate = {
  notification: NotificationBase;
  user_ids: string[]; // UUIDs
};

export interface NotificationUserResponse {
  id: string; // UUID
  first_name: string;
  last_name: string;
  image_url?: string | null;
}

export interface NotificationResponse extends NotificationBase {
  id: string; // UUID
  created_at: string; // ISO datetime
  recipients: NotificationUserResponse[];
}

export interface UnreadNotificationResponse extends NotificationBase {
  id: string; // UUID
  created_at: string; // ISO datetime
  is_read: boolean;
}

export interface NotificationReadUpdate {
  notification_id: string; // UUID
  user_id: string; // UUID
  is_read: boolean;
}
