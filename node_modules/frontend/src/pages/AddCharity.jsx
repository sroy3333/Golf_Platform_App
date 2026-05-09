import { useEffect, useState } from "react";
import API from "../api/api";

export default function AddCharity() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [charities, setCharities] = useState([]);

  const fetchCharities = async () => {
    try {
      const res = await API.get("/charity");
      setCharities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadCharities = async () => {
      try {
        const res = await API.get("/charity");
        setCharities(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadCharities();
  }, []);

  const handleSubmit = async () => {
    try {
      await API.post("/charity/add", { name, description });
      alert("Charity added");
      setName("");
      setDescription("");
      fetchCharities();
    } catch(err) {
      console.error(err);
      alert("Error adding charity");
    }
  };

    return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Add Charity
      </h1>

      {/* FORM */}
      <div className="bg-gray-800 p-4 rounded-xl w-full max-w-md mb-8">

        <input
          value={name}
          placeholder="Name"
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          onChange={e => setName(e.target.value)}
        />

        <textarea
          value={description}
          placeholder="Description"
          className="w-full p-2 mb-3 bg-gray-700 rounded"
          onChange={e => setDescription(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          Add Charity
        </button>
      </div>

      {/* CHARITY LIST */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Charity List
        </h2>

        {
          charities.length === 0 ? (
            <p>No charities found</p>
          ) : (
            <div className="grid gap-4">

              {charities.map((charity) => (

                <div
                  key={charity.id}
                  className="bg-gray-800 p-4 rounded-xl"
                >
                  <h3 className="text-xl font-bold text-green-400">
                    {charity.name}
                  </h3>

                  <p className="text-gray-300 mt-2">
                    {charity.description}
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