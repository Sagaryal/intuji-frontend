import { useState } from "react";
import { api } from "../services/api";
import { useTeams } from "../context/TeamContext";

export default function AddTeam() {
  const { fetchTeams } = useTeams();
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/teams", { name });
    setName("");
    fetchTeams();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Add Team</h2>
      <input
        type="text"
        placeholder="Team Name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">
        Add Team
      </button>
    </form>
  );
}
