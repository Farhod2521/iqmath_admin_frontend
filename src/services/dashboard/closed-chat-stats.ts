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

export type MentorClosedChats = {
  total: {
    closed_chats_count: number;
    average_rating: number;
  };
  today: {
    closed_chats_count: number;
    average_rating: number;
  };
  week: {
    closed_chats_count: number;
    average_rating: number;
  };
  month: {
    closed_chats_count: number;
    average_rating: number;
  };
  year: {
    closed_chats_count: number;
    average_rating: number;
  };
};

export const getMentroClosedChats = () =>
  axiosApi.get<MentorClosedChats>("/func_chat/teacher/closed-chats-stats/");

export const getClosedChatsStats = () =>
  axiosApi.get<ClosedChatsStatsData[]>(
    "/func_chat/superadmin_by_teacher_stats/closed-chats-stats/",
  );
