import {
  getMyWinningsService,
  getDrawHistoryService,
  getLeaderboardService
} from "./user.service.js";

// 🏆 My winnings
export const getMyWinnings = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await getMyWinningsService(userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📜 Draw history
export const getDrawHistory = async (req, res) => {
  try {
    const data = await getDrawHistoryService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🥇 Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const data = await getLeaderboardService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};