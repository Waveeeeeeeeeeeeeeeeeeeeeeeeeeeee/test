


export type LikeData = {
  id: number;
  user_id: number;
  liked_user_id: number;
  created_at: string;
  is_matched: boolean;
};

export type MatchData = LikeData;