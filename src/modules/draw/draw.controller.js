import { supabase } from "../../config/db.js";
import { generateDraw, calculateWinners } from "./draw.service.js";

export const createDraw = async (req, res) => {
  try {

    const numbers = generateDraw();

    const { data, error } = await supabase
      .from("draws")
      .insert([
        {
          draw_numbers: numbers,
          total_pool: 1000,
          status: "pending"
        }
      ])
      .select();

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    res.json(data[0]);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const getDraws = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("draws")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const runDraw = async (req, res) => {
  try {

    const { drawId } = req.body;

    const { data: draw } = await supabase
      .from("draws")
      .select("status")
      .eq("id", drawId)
      .single();

    if (!draw) {
      return res.status(404).json({
        message: "Draw not found"
      });
    }

    if (draw.status === "completed") {
      return res.status(400).json({
        message: "Draw already completed"
      });
    }

    const winners = await calculateWinners(drawId);

    res.json({
      message: "Draw completed",
      winners,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};