import { useState, useEffect } from "react";
import { api } from "../services/api";
import { usePlayers } from "../context/PlayerContext";

export default function ParticipantsList() {
  const { players, fetchPlayers } = usePlayers();
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [editing, setEditing] = useState<{ [key: number]: string | null }>({});

  useEffect(() => {
    // Initialize ratings state when players change
    const initialRatings = players.reduce((acc, player) => {
      acc[player.id] = player.skill;
      return acc;
    }, {} as { [key: number]: number });
    setRatings(initialRatings);
  }, [players]);

  const handleAddParticipant = async () => {
    const response = await api.post("/players", { name: "", skill: 1 });
    fetchPlayers(); // Refresh player list
    setEditing((prev) => ({ ...prev, [response.data.id]: "" })); // Enable editing for new player
  };

  const handleDeleteParticipant = async (id: number) => {
    await api.delete(`/players/${id}`);
    fetchPlayers(); // Refresh player list
  };

  const handleRating = async (id: number, skill: number) => {
    setRatings((prev) => ({ ...prev, [id]: skill }));
    await api.put(`/players/${id}`, {
      name: players.find((p) => p.id === id)?.name,
      skill,
    });
    fetchPlayers(); // Refresh player list
  };

  const handleNameChange = (id: number, value: string) => {
    setEditing((prev) => ({ ...prev, [id]: value }));
  };

  const handleNameBlur = async (id: number) => {
    const newName = editing[id]?.trim();
    if (!newName) return; // Prevent empty name updates

    await api.put(`/players/${id}`, { name: newName, skill: ratings[id] });
    setEditing((prev) => ({ ...prev, [id]: null }));
    fetchPlayers(); // Refresh player list
  };

  const handleKeyDown = (id: number, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameBlur(id);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-auto bg-white shadow-md p-4 min-w-[24rem]">
        <h2 className="font-bold text-lg mb-4">Participants</h2>
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center justify-between mb-2"
          >
            <button
              className="text-red-500 font-bold mr-2"
              onClick={() => handleDeleteParticipant(player.id)}
            >
              ×
            </button>
            {editing[player.id] !== undefined ? (
              <input
                type="text"
                value={editing[player.id] ?? ""}
                onChange={(e) => handleNameChange(player.id, e.target.value)}
                onBlur={() => handleNameBlur(player.id)}
                onKeyDown={(e) => handleKeyDown(player.id, e)}
                autoFocus
                className="flex-1 p-1 border"
                required
              />
            ) : (
              <input
                type="text"
                value={player.name}
                readOnly
                onClick={() =>
                  setEditing((prev) => ({ ...prev, [player.id]: player.name }))
                }
                className="flex-1 p-1 border cursor-pointer"
              />
            )}
            <div className="flex ml-2 space-x-0 flex-wrap">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`px-2 py-1 text-white transition-all ${
                    ratings[player.id] >= num
                      ? "bg-red-500 scale-105"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => handleRating(player.id, num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center mt-4">
          <span className="font-bold text-gray-700 bg-gray-200 px-4 py-2 border-r border-gray-400">
            {players.length}
          </span>
          <button
            onClick={handleAddParticipant}
            className="bg-gray-700 text-white py-2 px-4 hover:bg-gray-800 transition-all"
          >
            Add Participant
          </button>
        </div>
      </div>
    </div>
  );
}
