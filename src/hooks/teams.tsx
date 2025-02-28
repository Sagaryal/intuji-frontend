import { useEffect, useState } from "react";
import { api } from "../services/api";

export interface Team {
  id: string;
  name: string;
}

export const useTeams = () => {
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

  return { teams, setTeams, fetchTeams };
};
