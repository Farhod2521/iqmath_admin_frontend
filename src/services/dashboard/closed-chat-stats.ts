import { axiosApi } from "@/configs/api";

export type ChatsRating = {
  closed_chats_count: number;
  average_rating: number;
};

export type ClosedChatsStatsData = {
  teacher_id: number;
  full_name: string;
  region: string;
  total: ChatsRating;
  today: ChatsRating;
  week: ChatsRating;
  month: ChatsRating;
  year: ChatsRating;
};

export const getClosedChatsStats = () =>
  axiosApi.get<ClosedChatsStatsData[]>(
    "/func_chat/superadmin_by_teacher_stats/closed-chats-stats/",
  );
