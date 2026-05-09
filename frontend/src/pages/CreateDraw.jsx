import { useEffect, useState, useCallback } from "react";
import API from "../api/api";

export default function CreateDraw() {

  const [draws, setDraws] = useState([]);

  const fetchDraws = useCallback(async () => {
    try {

      const res = await API.get("/draw");

      setDraws(res.data);

    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchDraws();
    };

    fetchData();
  }, [fetchDraws]);


  const handleCreate = async () => {
    try {

      await API.post("/draw/create");

      alert("Draw created successfully");

      // refresh list
      fetchDraws();

    } catch (err) {
      console.error(err);
      alert("Error creating draw");
    }
  };
  
  
  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Create Draw
      </h1>

      <button
        onClick={handleCreate}
        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 mb-8"
      >
        Create Draw
      </button>

      {/* DRAW LIST */}
      <div>

        <h2 className="text-2xl font-semibold mb-4">
          Draw History
        </h2>

        {
          draws.length === 0 ? (
            <p>No draws found</p>
          ) : (
            <div className="grid gap-4">

              {draws.map((draw) => (

                <div
                  key={draw.id}
                  className="bg-gray-800 p-4 rounded-xl"
                >

                  <h3 className="text-xl font-bold text-green-400 mb-2">
                    Draw #{draw.id}
                  </h3>

                  <p>
                    <span className="font-semibold">
                      Numbers:
                    </span>{" "}
                    {draw.draw_numbers.join(", ")}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Pool:
                    </span>{" "}
                    ₹{draw.total_pool}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Status:
                    </span>{" "}
                    {draw.status}
                  </p>

                </div>

              ))}

            </div>
          )
        }

      </div>

    </div>
  );
}