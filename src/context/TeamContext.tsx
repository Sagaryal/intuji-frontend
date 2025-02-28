import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface Team {
  id: number;
  name: string;
}

interface TeamContextType {
  teams: Team[];
  fetchTeams: () => Promise<void>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  const fetchTeams = async () => {
    try {
      const response = await api.get("/teams");
      setTeams(response.data);
    } catch (error) {
      console.error("Failed to fetch teams", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamContext.Provider value={{ teams, fetchTeams }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error("useTeams must be used within a TeamProvider");
  }
  return context;
};
