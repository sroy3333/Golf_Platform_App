import { useEffect, useState } from "react";
import API from "../api/api";

export default function Subscription() {

  const [subs, setSubs] = useState([]);

   const fetchSubscriptions = async () => {
    try {
      const res = await API.get("/subscription");
      setSubs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadSubscriptions = async () => {
      try {
        const res = await API.get("/subscription");
        if (isMounted) setSubs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadSubscriptions();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubscribe = async (plan) => {
    try {
      const res = await API.post("/subscription/create", { plan });
      console.log("SUB RESPONSE:", res.data);
      alert("Subscription activated!");

      fetchSubscriptions();
  
    } catch (err) {
      console.error("SUB ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl mb-6">💳 Subscription Plans</h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-gray-800 p-6 rounded">
            <h2 className="text-xl">Monthly</h2>
            <p className="text-gray-400">₹99/month</p>
            <button
              onClick={() => handleSubscribe("monthly")}
              className="mt-4 bg-green-500 px-4 py-2 rounded"
            >
              Subscribe
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded">
            <h2 className="text-xl">Yearly</h2>
            <p className="text-gray-400">₹999/year</p>
            <button
              onClick={() => handleSubscribe("yearly")}
              className="mt-4 bg-green-500 px-4 py-2 rounded"
            >
              Subscribe
            </button>
          </div>

        </div>
      </div>

      <div>
        <h2 className="text-xl mt-8 mb-4">📜 My Subscriptions</h2>
        {subs.length === 0 ? (
          <p className="text-gray-400">No subscriptions yet</p>
        ) : (
          subs.map((s, i) => (
            <div key={i} className="bg-gray-800 p-4 mb-2 rounded">
              <p>Plan: {s.plan}</p>
              <p>Status: {s.status}</p>
              <p>Ends: {new Date(s.end_date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}