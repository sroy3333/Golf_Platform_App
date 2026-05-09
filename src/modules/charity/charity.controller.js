import { supabase } from "../../config/db.js";

// ADD CHARITY
export const addCharity = async (req, res) => {
  try {
    const { name, description } = req.body;

    const { data, error } = await supabase
      .from("charities")
      .insert([{ name, description }])
      .select();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    res.json({
      message: "Charity added",
      charity: data[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL CHARITIES
export const getCharities = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("charities")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};