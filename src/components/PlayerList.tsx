import { useState, useEffect } from "react";
import { post, put, remove } from "../services/api";
import usePlayers from "../hooks/usePlayers";
import { Player } from "../types";
import Input from "./ui/Input";
import RatingSkill from "./RatingSkill";
import CrossButton from "./ui/CrossButton";
import ItemCount from "./ui/ItemCount";
import SubmitButton from "./ui/SubmitButton";

const slug = "players";

export default function PlayerList() {
  const { players, setPlayers, fetchPlayers } = usePlayers();
  const [newPlayer, setNewPlayer] = useState<Player | null>(null);
  const [skillRating, setSkillRating] = useState<{ [key: string]: number }>({});
  const [editField, setEditField] = useState<{ [key: string]: string | null }>(
    {}
  );
  const [formError, setFormError] = useState<{
    id: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    // Initialize skillRating state when players change
    const initialSkillRating = players.reduce((acc, player) => {
      acc[player.id] = player.skill;
      return acc;
    }, {} as { [key: string]: number });
    setSkillRating(initialSkillRating);
  }, [players]);

  const handleAddItem = () => {
    if (newPlayer && formError?.id === newPlayer?.id) return;
    const tempPlayer: Player = {
      id: Date.now().toString(),
      name: "",
      skill: 1,
    };
    setNewPlayer(tempPlayer);
  };

  const handleDeleteItem = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this player?"
    );
    if (!isConfirmed) return;

    try {
      await remove(slug, id);
      await fetchPlayers();
    } catch (err) {
      console.error("Error deleting player:", err);
      setFormError({ id, message: (err as Error).message || "Error occured" });
    }
  };

  const handleSkillRating = async (id: string, skill: number) => {
    await put<any, Player>(slug, id, {
      name: players.find((p) => p.id === id)?.name,
      skill,
    });
    setSkillRating((prev) => ({ ...prev, [id]: skill }));
  };

  const handleNameChange = (id: string, value: string) => {
    setEditField((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (id: string) => {
    try {
      const newName =
        id === newPlayer?.id ? newPlayer?.name.trim() : editField[id]?.trim();

      // Skip API call if the name hasn't changed
      const currentName = players.find((player) => player.id === id)?.name;
      if (newName === currentName) {
        setEditField((prev) => ({ ...prev, [id]: null }));
        return;
      }

      if (!newName) {
        setFormError({ id, message: "Name cannot be empty!" });
        return; // Prevent empty name updates
      }
      setFormError(null);

      // If it's a new player, send the API request to create it
      if (id === newPlayer?.id) {
        await post<any, Player>(slug, {
          name: newName,
          skill: newPlayer.skill,
        });
        await fetchPlayers();
        setNewPlayer(null);
      } else {
        await put<any, Player>(slug, id, {
          name: newName,
          skill: skillRating[id],
        });
        setPlayers((prev) =>
          prev.map((player) =>
            player.id === id
              ? { ...player, name: newName, skill: skillRating[id] }
              : player
          )
        );
      }
    } catch (err) {
      console.error("Error occured:", err);
      setFormError({
        id,
        message: (err as Error).message || "Error Occured",
      });
    }

    setEditField((prev) => ({ ...prev, [id]: null }));
  };

  return (
    <div className="w-full">
      <h2 className="font-bold text-lg mb-4">Players</h2>
      {players.map((player) => {
        const isEdit =
          editField[player.id] !== undefined && editField[player.id] !== null;
        return (
          <div key={player.id}>
            <div className="flex items-center justify-between mb-2">
              <CrossButton onClick={() => handleDeleteItem(player.id)}>
                x
              </CrossButton>

              <Input
                value={isEdit ? editField[player.id] ?? "" : player.name}
                onChange={(val) => handleNameChange(player.id, val)}
                onBlur={() => handleSubmit(player.id)}
                onClick={() =>
                  setEditField((prev) => ({
                    ...prev,
                    [player.id]: player.name,
                  }))
                }
                editable={isEdit}
              />
              <RatingSkill
                skill={skillRating[player.id] || 1}
                onRate={(num) => handleSkillRating(player.id, num)}
              />
            </div>
            {editField?.[player.id] !== null && formError?.id === player.id && (
              <span className="text-red-400">{formError.message}</span>
            )}
          </div>
        );
      })}
      {newPlayer && (
        <>
          <div className="flex items-center justify-between mb-2">
            <CrossButton onClick={() => setNewPlayer(null)}>x</CrossButton>
            <Input
              value={newPlayer.name}
              onChange={(val) => {
                setFormError(null);
                setNewPlayer({ ...newPlayer, name: val, skill: 1 });
              }}
              onBlur={() => handleSubmit(newPlayer.id)}
              editable={true}
            />
            <RatingSkill
              skill={newPlayer.skill}
              onRate={(num) => setNewPlayer({ ...newPlayer, skill: num })}
            />
          </div>

          {formError && formError.id === newPlayer.id && (
            <span className="text-red-400">{formError.message}</span>
          )}
        </>
      )}
      <div className="flex items-center mt-4">
        <ItemCount>{players.length + (newPlayer ? 1 : 0)}</ItemCount>
        <SubmitButton onClick={handleAddItem}> Add Participant</SubmitButton>
      </div>
    </div>
  );
}
