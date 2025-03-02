import { useEffect, useState } from "react";
import { get } from "../services/api";
import { Team } from "../types";

const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  const fetchTeams = async () => {
    try {
      const data = await get<Team[]>("/teams");
      setTeams(data);
    } catch (error) {
      console.error("Failed to fetch teams", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return { teams, setTeams, fetchTeams };
};

export default useTeams;
