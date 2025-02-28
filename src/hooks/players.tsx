import { useEffect, useState } from "react";
import { api } from "../services/api";

export interface Player {
  id: string;
  name: string;
  skill: number;
}

export const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const fetchPlayers = async () => {
    try {
      const response = await api.get("/players");
      setPlayers(response.data);
    } catch (error) {
      console.error("Failed to fetch players", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return { players, setPlayers, fetchPlayers };
};
