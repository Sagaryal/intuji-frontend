import { useState } from "react";
import { api } from "../services/api";
import { usePlayers } from "../context/PlayerContext";

export default function AddPlayer() {
  const { fetchPlayers } = usePlayers();
  const [name, setName] = useState("");
  const [skill, setSkill] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/players", { name, skill });
    setName("");
    setSkill(1);
    fetchPlayers();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Add Player</h2>
      <input
        type="text"
        placeholder="Player Name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select
        value={skill}
        onChange={(e) => setSkill(Number(e.target.value))}
        className="border p-2 w-full mb-2"
      >
        {[1, 2, 3, 4, 5].map((level) => (
          <option key={level} value={level}>
            Skill Level {level}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Add Player
      </button>
    </form>
  );
}
