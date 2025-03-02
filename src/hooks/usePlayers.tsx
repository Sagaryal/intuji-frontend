import { useEffect, useState } from "react";
import { get } from "../services/api";
import { Player } from "../types";

const usePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const fetchPlayers = async () => {
    try {
      const data = await get<Player[]>("/players");
      setPlayers(data);
    } catch (error) {
      console.error("Failed to fetch players", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return { players, setPlayers, fetchPlayers };
};

export default usePlayers;
