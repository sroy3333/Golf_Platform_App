import { supabase } from "../../config/db.js";

// Mock create subscription
export const createSubscription = async (req, res) => {
  try {
    const { plan } = req.body; // monthly / yearly
    const userId = req.user.id;

    const { data: existing } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .eq("status", "active");

    if (existing && existing.length > 0) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const amount = plan === "monthly" ? 100 : 1000;

    let endDate = new Date();
    plan === "monthly"
      ? endDate.setMonth(endDate.getMonth() + 1)
      : endDate.setFullYear(endDate.getFullYear() + 1);

    // insert subscription
    const { data, error } = await supabase
      .from("subscriptions")
      .insert([
        {
          user_id: userId,
          plan,
          status: "active",
          end_date: endDate,
          amount,
        },
      ])
      .select();

    if (error) {
      console.error("INSERT ERROR:", error);
      return res.status(500).json({ error: error.message });
    }

    console.log("INSERTED DATA:", data);

    // update user subscription status
    await supabase
      .from("users")
      .update({ subscription_status: "active", subscription_end: endDate })
      .eq("id", userId);

    res.json({
      message: "Subscribed", data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMySubscription = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};