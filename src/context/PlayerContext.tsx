import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Player {
  id: number;
  name: string;
  skill: number;
}

interface PlayerContextType {
  players: Player[];
  fetchPlayers: () => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <PlayerContext.Provider value={{ players, fetchPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayers must be used within a PlayerProvider");
  }
  return context;
};
