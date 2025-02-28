import { useState } from "react";
import { api } from "../services/api";
import { Team, useTeams } from "../hooks/teams";

export default function TeamList() {
  const { teams, setTeams, fetchTeams } = useTeams();
  const [newTeam, setNewTeam] = useState<Team | null>(null);
  const [editing, setEditing] = useState<{ [key: string]: string | null }>({});
  const [formError, setFormError] = useState<{
    id: string;
    message: string;
  } | null>(null);

  const handleAddTeam = () => {
    if (newTeam && formError?.id === newTeam?.id) return;
    const tempTeam = { id: Date.now().toString(), name: "" };
    setNewTeam(tempTeam);
  };

  const handleDeleteTeam = async (id: string) => {
    try {
      await api.delete(`/teams/${id}`);
      await fetchTeams();
    } catch (err) {
      console.error("Error deleting team:", err);
      setFormError({ id, message: (err as Error).message || "Error occured" });
    }
  };

  const handleChange = (id: string, value: string) => {
    setEditing((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = async (id: string) => {
    const newName = editing[id]?.trim() || newTeam?.name.trim();
    if (!newName) {
      setFormError({ id, message: "Name cannot be empty!" });
      return; // Prevent empty name updates
    }

    setFormError(null);

    // If it's a new team, send the API request to create it
    if (id === newTeam?.id) {
      try {
        await api.post("/teams", { name: newName });
        // Add the newly created team to the state with the ID from the API response
        // setTeams((prevTeams) => [
        //   ...prevTeams,
        //   { id: response.data.id, name: response.data.name},
        // ]);
        await fetchTeams();
        setNewTeam(null); // Reset the newTeam state after the API request
      } catch (err) {
        console.error("Error adding team:", err);
        setFormError({
          id,
          message: (err as Error).message || "Error Occured",
        });
      }
    } else {
      try {
        await api.put(`/teams/${id}`, { name: newName });
        // await fetchTeams();
        setTeams((prevTeams) =>
          prevTeams.map((team) =>
            team.id === id ? { ...team, name: newName } : team
          )
        );
      } catch (err) {
        console.error("Error updating team:", err);
        setFormError({
          id,
          message: (err as Error).message || "Error Occured",
        });
      }
    }

    setEditing((prev) => ({ ...prev, [id]: null })); // End editing
  };

  const handleKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur(id);
    }
  };

  //   console.log({ teams });
  //   console.log({ newTeam });
  //   console.log({ editing });
  //   console.log({ formError });
  return (
    <div className="w-full">
      <h2 className="font-bold text-lg mb-4">Teams</h2>
      {teams.map((team) => (
        <div key={team.id}>
          <div className="flex items-center justify-between mb-2">
            <button
              className="text-red-500 font-bold mr-2"
              onClick={() => handleDeleteTeam(team.id)}
            >
              ×
            </button>

            {editing[team.id] !== undefined && editing[team.id] !== null ? (
              <input
                type="text"
                value={editing[team.id] ?? ""}
                onChange={(e) => handleChange(team.id, e.target.value)}
                onBlur={() => handleBlur(team.id)}
                onKeyDown={(e) => handleKeyDown(team.id, e)}
                autoFocus
                className="flex-1 p-1 border"
                required
              />
            ) : (
              <input
                type="text"
                value={team.name}
                readOnly
                onClick={() =>
                  setEditing((prev) => ({ ...prev, [team.id]: team.name }))
                }
                className="flex-1 p-1 border cursor-pointer"
              />
            )}
          </div>
          {formError && formError.id === team.id && (
            <span className="text-red-400">{formError.message}</span>
          )}
        </div>
      ))}

      {newTeam && (
        <>
          <div className="flex items-center justify-between mb-2">
            <button
              className="text-red-500 font-bold mr-2"
              onClick={() => setNewTeam(null)}
            >
              ×
            </button>
            <input
              type="text"
              value={newTeam.name}
              onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
              onBlur={() => handleBlur(newTeam.id)}
              onKeyDown={(e) => handleKeyDown(newTeam.id, e)}
              autoFocus
              className="flex-1 p-1 border"
              required
            />
          </div>
          {formError && formError.id === newTeam.id && (
            <span className="text-red-400">{formError.message}</span>
          )}
        </>
      )}
      <div className="flex items-center mt-4">
        <span className="font-bold text-gray-700 bg-gray-200 px-4 py-2 border-r border-gray-400">
          {teams.length + (newTeam ? 1 : 0)}
        </span>
        <button
          onClick={handleAddTeam}
          className="bg-gray-700 text-white py-2 px-4 hover:bg-gray-800 transition-all"
        >
          Add Team
        </button>
      </div>
    </div>
  );
}
