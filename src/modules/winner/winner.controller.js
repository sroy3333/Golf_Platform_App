import { supabase } from "../../config/db.js";

export const uploadProof = async (req, res) => {
  const { winnerId, proof_url } = req.body;
  const userId = req.user.id;

  const { data: winner} = await supabase
    .from("winners")
    .select("*") 
    .eq("id", winnerId)
    .single();

  if (!winner) {
    return res.status(404).json({ message: "Winner not found" });
  }

  if (winner.user_id !== userId) {
    return res.status(403).json({ message: "Not your winning" });
  }

  const { data } = await supabase
    .from("winners")
    .update({
      proof_url,
      status: "submitted"
    })
    .eq("id", winnerId);
  res.json({ message: "Proof uploaded" });
};

export const verifyWinner = async (req, res) => {
  try {
    const { winnerId, status } = req.body;

    // validation
    if (!winnerId || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        error: "winnerId and valid status (approved/rejected) required",
      });
    }

    const { data } = await supabase
      .from("winners")
      .update({ status })
      .eq("id", winnerId)
      .select()
      .single();

    res.json({
      message: `Winner ${status} successfully`,
      data,
    });
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getWinners = async (req, res) => {
  const { data } = await supabase
    .from("winners")
    .select(`
      *,
      users (
        id,
        name,
        email
      )
    `)
    .order("created_at", { ascending: false });

  res.json({ winners: data });
};