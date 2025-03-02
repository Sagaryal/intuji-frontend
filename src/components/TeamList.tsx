import { useState } from "react";
import { api } from "../services/api";
import useTeams from "../hooks/useTeams";
import Input from "./ui/Input";
import { Team } from "../types";
import CrossButton from "./ui/CrossButton";
import SubmitButton from "./ui/SubmitButton";
import ItemCount from "./ui/ItemCount";

export default function TeamList() {
  const { teams, setTeams, fetchTeams } = useTeams();
  const [newTeam, setNewTeam] = useState<Team | null>(null);
  const [editField, setEditField] = useState<{ [key: string]: string | null }>(
    {}
  );
  const [formError, setFormError] = useState<{
    id: string;
    message: string;
  } | null>(null);

  const handleAddItem = () => {
    if (newTeam && formError?.id === newTeam?.id) return;
    const tempTeam = { id: Date.now().toString(), name: "" };
    setNewTeam(tempTeam);
  };

  const handleDeleteItem = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this team?"
    );
    if (!isConfirmed) return;

    try {
      await api.delete(`/teams/${id}`);
      await fetchTeams();
    } catch (err) {
      console.error("Error deleting team:", err);
      setFormError({ id, message: (err as Error).message || "Error occured" });
    }
  };

  const handleNameChange = (id: string, value: string) => {
    setEditField((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (id: string) => {
    try {
      const newName =
        id === newTeam?.id ? newTeam?.name.trim() : editField[id]?.trim();

      // Skip API call if the name hasn't changed
      const currentName = teams.find((team) => team.id === id)?.name;
      if (newName === currentName) {
        setEditField((prev) => ({ ...prev, [id]: null }));
        return;
      }

      if (!newName) {
        setFormError({ id, message: "Name cannot be empty!" });
        return; // Prevent empty name updates
      }
      setFormError(null);

      // If it's a new team, send the API request to create it
      if (id === newTeam?.id) {
        const response = await api.post("/teams", { name: newName });
        setTeams((prev) => [
          ...prev,
          {
            name: response.data.name,
            id: response.data.id,
          },
        ]);

        setNewTeam(null); // Reset the newTeam state after the API request
      } else {
        await api.put(`/teams/${id}`, { name: newName });
        setTeams((prev) =>
          prev.map((team) =>
            team.id === id ? { ...team, name: newName } : team
          )
        );
      }
    } catch (err) {
      console.error("Error Occurred", err);
      setFormError({
        id,
        message: (err as Error).message || "Error Occured",
      });
    }

    setEditField((prev) => ({ ...prev, [id]: null }));
  };

  return (
    <div className="w-full">
      <h2 className="font-bold text-lg mb-4">Teams</h2>
      {teams.map((team) => {
        const isEdit =
          editField[team.id] !== undefined && editField[team.id] !== null;
        return (
          <div key={team.id}>
            <div className="flex items-center justify-between mb-2">
              <CrossButton onClick={() => handleDeleteItem(team.id)}>
                x
              </CrossButton>
              <Input
                value={isEdit ? editField[team.id] ?? "" : team.name}
                onChange={(val) => handleNameChange(team.id, val)}
                onBlur={() => handleSubmit(team.id)}
                onClick={() =>
                  setEditField((prev) => ({ ...prev, [team.id]: team.name }))
                }
                editable={isEdit}
              />
            </div>
            {editField?.[team.id] !== null && formError?.id === team.id && (
              <span className="text-red-400">{formError.message}</span>
            )}
          </div>
        );
      })}

      {newTeam && (
        <>
          <div className="flex items-center justify-between mb-2">
            <CrossButton onClick={() => setNewTeam(null)}>x</CrossButton>
            <Input
              value={newTeam.name}
              onChange={(val) => {
                setFormError(null);
                setNewTeam({ ...newTeam, name: val });
              }}
              onBlur={() => handleSubmit(newTeam.id)}
              editable={true}
            />
          </div>

          {formError && formError.id === newTeam.id && (
            <span className="text-red-400">{formError.message}</span>
          )}
        </>
      )}
      <div className="flex items-center mt-4">
        <ItemCount>{teams.length + (newTeam ? 1 : 0)}</ItemCount>
        <SubmitButton onClick={handleAddItem}>Add Team</SubmitButton>
      </div>
    </div>
  );
}
