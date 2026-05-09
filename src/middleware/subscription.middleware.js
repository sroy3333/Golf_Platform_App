import { supabase } from "../config/db.js";

export const subscriptionMiddleware = async (req, res, next) => {
  const userId = req.user.id;

  const { data } = await supabase
    .from("users")
    .select("subscription_status, subscription_end")
    .eq("id", userId)
    .single();

  if (!data || data.subscription_status !== "active") {
    return res.status(403).json({ message: "Subscription inactive" });
  }

  if (new Date(data.subscription_end) < new Date()) {
    return res.status(403).json({ message: "Subscription expired" });
  }

  next();
};