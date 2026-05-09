import { supabase } from "../../config/db.js";

export const addScore = async (req, res) => {
  const { user_id: userId, score, date } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

   if (score < 1 || score > 45) {
      return res.status(400).json({ message: "Score must be 1-45" });
    }


  // duplicate date check
  const { data: existing, error: duplicateError } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", userId)
    .eq("date", date);

  if (duplicateError) {
    return res.status(500).json({
      error: duplicateError.message
    });
  }

  if (existing.length > 0) {
    return res.status(400).json({ message: "Duplicate date" });
  }

  const { data: scores, error: scoreError } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: true });

  if (scoreError) {
    return res.status(500).json({ error: scoreError.message });
  }

  if (scores.length >= 5) {
    await supabase
      .from("scores")
      .delete()
      .eq("id", scores[0].id);
  }

  const { data, error } = await supabase
    .from("scores")
    .insert([
      { 
        user_id: userId, 
        score, 
        date 
      }
    ])
    .select();

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json({
    message: "Score added",
    score: data[0]
  });

};

export const getScores = async (req, res) => {
  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    return res.status(500).json({
      error: error.message
    });
  }

  res.json(data);
};
