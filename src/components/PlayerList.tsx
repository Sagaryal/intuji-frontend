import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Player, usePlayers } from "../hooks/players";

export default function PlayerList() {
  const { players, setPlayers, fetchPlayers } = usePlayers();
  const [newPlayer, setNewPlayer] = useState<Player | null>(null);

  const [skillRating, setSkillRating] = useState<{ [key: string]: number }>({});
  const [editing, setEditing] = useState<{ [key: string]: string | null }>({});
  const [formError, setFormError] = useState<{
    id: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    // Initialize skillRating state when players change
    const initialSkillRating = players.reduce((acc, player) => {
      acc[player.id] = player.skill;
      return acc;
    }, {} as { [key: number]: number });
    setSkillRating(initialSkillRating);
  }, [players]);

  const handleAddParticipant = () => {
    if (newPlayer && formError?.id === newPlayer?.id) return;
    const tempPlayer: Player = {
      id: Date.now().toString(),
      name: "",
      skill: 1,
    };
    setNewPlayer(tempPlayer);
  };

  const handleDeletePlayer = async (id: string) => {
    try {
      await api.delete(`/players/${id}`);
      await fetchPlayers();
    } catch (err) {
      console.error("Error deleting player:", err);
      setFormError({ id, message: (err as Error).message || "Error occured" });
    }
  };

  const handleSkillRating = async (id: string, skill: number) => {
    setSkillRating((prev) => ({ ...prev, [id]: skill }));
    await api.put(`/players/${id}`, {
      name: players.find((p) => p.id === id)?.name,
      skill,
    });
    // fetchPlayers(); // Refresh player list
  };

  const handleNameChange = (id: string, value: string) => {
    setEditing((prev) => ({ ...prev, [id]: value }));
  };

  const handleNameBlur = async (id: string) => {
    const newName = editing[id]?.trim() || newPlayer?.name.trim();
    if (!newName) {
      setFormError({ id, message: "Name cannot be empty!" });
      return; // Prevent empty name updates
    }

    setFormError(null);
    console.log({ newName });

    // If it's a new player, send the API request to create it
    if (id === newPlayer?.id) {
      try {
        await api.post("/players", { name: newName });
        // Add the newly created player to the state with the ID from the API response
        // setPlayers((prevPlayers) => [
        //   ...prevPlayers,
        //   { id: response.data.id, name: response.data.name},
        // ]);
        await fetchPlayers();
        setNewPlayer(null); // Reset the newPlayer state after the API request
      } catch (err) {
        console.error("Error adding player:", err);
        setFormError({
          id,
          message: (err as Error).message || "Error Occured",
        });
      }
    } else {
      try {
        await api.put(`/players/${id}`, {
          name: newName,
        });
        // await fetchPlayers();
        setPlayers((prevPlayers) =>
          prevPlayers.map((player) =>
            player.id === id ? { ...player, name: newName } : player
          )
        );
      } catch (err) {
        console.error("Error updating player:", err);
        setFormError({
          id,
          message: (err as Error).message || "Error Occured",
        });
      }
    }

    setEditing((prev) => ({ ...prev, [id]: null }));
    // fetchPlayers(); // Refresh player list
  };

  const handleKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameBlur(id);
    }
  };

  console.log({ players });
  console.log({ skillRating });
  console.log({ editing });
  console.log({ newPlayer });
  console.log({ formError });

  return (
    <div className="w-full">
      <h2 className="font-bold text-lg mb-4">Players</h2>
      {players.map((player) => (
        <div key={player.id}>
          <div className="flex items-center justify-between mb-2">
            <button
              className="text-red-500 font-bold mr-2"
              onClick={() => handleDeletePlayer(player.id)}
            >
              ×
            </button>
            {editing[player.id] !== undefined && editing[player.id] !== null ? (
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
                    skillRating[player.id] >= num
                      ? "bg-red-500 scale-105"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => handleSkillRating(player.id, num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          {formError && formError.id === player.id && (
            <span className="text-red-400">{formError.message}</span>
          )}
        </div>
      ))}
      {newPlayer && (
        <>
          <div className="flex items-center justify-between mb-2">
            <button
              className="text-red-500 font-bold mr-2"
              onClick={() => setNewPlayer(null)}
            >
              ×
            </button>
            <input
              type="text"
              value={newPlayer.name}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, name: e.target.value })
              }
              onBlur={() => handleNameBlur(newPlayer.id)}
              onKeyDown={(e) => handleKeyDown(newPlayer.id, e)}
              autoFocus
              className="flex-1 p-1 border"
              required
            />
          </div>
          {formError && formError.id === newPlayer.id && (
            <span className="text-red-400">{formError.message}</span>
          )}
        </>
      )}
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
  );
}
