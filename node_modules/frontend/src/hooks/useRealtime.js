import { useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import API from "../api/api";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export const useRealtime = (setData) => {
  const timeoutRef = useRef(null);
  
  
  useEffect(() => {
    const channel = supabase
      .channel("winners-channel")
      .on(
        "postgres_changes",
        { event: "*",
          schema: "public",
          table: "winners"
        },
        () => {
          console.log("Realtime update triggered");
          
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          
          timeoutRef.current = setTimeout(() => {
            API.get("/user/leaderboard")
              .then(res => setData(res.data))
              .catch(err => console.error(err));
          }, 500);
        }
      )
      .subscribe();

     return () => {
      supabase.removeChannel(channel);

      // ✅ cleanup timeout on unmount
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [setData]);
};