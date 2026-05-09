import { supabase } from "../../config/db.js";

export const getStats = async (req, res) => {
  const { count: users } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { data: draws, error } = await supabase.from("draws").select("*");

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  const totalPool = draws.reduce((sum, d) => sum + (d.jackpot_pool || 0), 0);

  res.json({
    users,
    totalPool,
    draws: draws.length,
  });
};