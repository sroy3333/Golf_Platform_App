import { supabase } from "../../config/db.js";

// 🏆 Get my winnings
export const getMyWinningsService = async (userId) => {
  const { data, error } = await supabase
    .from("winners")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

// 📜 Get draw history
export const getDrawHistoryService = async () => {
  const { data, error } = await supabase
    .from("draws")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

// 🥇 Leaderboard
export const getLeaderboardService = async () => {
  const { data, error } = await supabase
    .from("winners")
    .select("user_id, match_type");

  if (error) throw error;

  // aggregate scores
  const leaderboard = {};

  data.forEach((w) => {
    if (!leaderboard[w.user_id]) {
      leaderboard[w.user_id] = 0;
    }
    leaderboard[w.user_id] += w.match_type;
  });

  return Object.entries(leaderboard)
    .map(([user_id, score]) => ({ user_id, score }))
    .sort((a, b) => b.score - a.score);
};