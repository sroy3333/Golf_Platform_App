import { supabase } from "../../config/db.js";

export const generateDraw = () => {
  return Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 45) + 1
  );
};

export const calculateWinners = async (drawId) => {
  const { data: draw } = await supabase
    .from("draws")
    .select("*")
    .eq("id", drawId)
    .single();

  if (!draw) {
    throw new Error("Draw not found");
  }


  const { data: scores } = await supabase
    .from("scores")
    .select("*");

  const UserMap = {};
  scores.forEach(s => {
    if (!UserMap[s.user_id]) UserMap[s.user_id] = [];
    UserMap[s.user_id].push(s.score);
  });

  let winners = [];

  for (let userId in UserMap) {
    const matches = UserMap[userId].filter(num =>
      draw.draw_numbers.includes(num)
    ).length;

    if (matches >= 3) {
      winners.push({
        user_id: userId,
        match_type: matches
      });
    }
  }
  
  const pool = draw.total_pool || 1000;

  const prizeSplit = {
    5: pool * 0.4,
    4: pool * 0.35,
    3: pool * 0.25,
  };

  const count = { 3: 0, 4: 0, 5: 0 };

  winners.forEach((w) => {
    count[w.match_type]++;
  });

  const final = winners.map(w => ({
    ...w,
    draw_id: drawId,
    prize_amount: prizeSplit[w.match_type] / (count[w.match_type] || 1),
    status: "pending",
  }));

  if (count[5] === 0) {
    await supabase.from("draws").update({
      jackpot_pool: pool + pool * 0.4
    }).eq("id", drawId);
  }

  if (final.length === 0) {
    await supabase
      .from("draws")
      .update({ status: "completed" })
      .eq("id", drawId);

    return [];
  }

  // 7. Mark draw completed
  const { data: inserted, error } = await supabase
    .from("winners")
    .insert(final)
    .select();

  if (error) {
    console.error("WINNER INSERT ERROR:", error);
    throw new Error(error.message);
  }

  console.log("✅ INSERT SUCCESS:", inserted);
  
  await supabase
    .from("draws")
    .update({ status: "completed" })
    .eq("id", drawId);

  return inserted;
};