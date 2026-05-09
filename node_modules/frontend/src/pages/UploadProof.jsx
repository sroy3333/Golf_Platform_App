import { useState } from "react";
import API from "../api/api";

export default function UploadProof({ winnerId }) {
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    try {
      await API.post("/winner/upload-proof", {
        winnerId,
        proof_url: url
      });
      alert("Proof submitted");
    } catch {
      alert("Failed");
    }
  };

  return (
    <div>
      <input
        placeholder="Paste proof URL"
        onChange={e => setUrl(e.target.value)}
      />
      <button onClick={handleUpload}>Submit Proof</button>
    </div>
  );
}