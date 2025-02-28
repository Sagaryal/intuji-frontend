import { useState } from "react";
import { api } from "../services/api";

export default function GenerateTeams() {
  const [generatedTeams, setGeneratedTeams] = useState<Record<
    string,
    any[]
  > | null>(null);

  const handleGenerate = async () => {
    const response = await api.post("/teams/generate");
    setGeneratedTeams(response.data);
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Generate Teams</h2>
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Generate Balanced Teams
      </button>

      {generatedTeams && (
        <div className="mt-4 border p-2 rounded-md">
          {Object.entries(generatedTeams).map(([teamName, players]) => (
            <div key={teamName} className="mb-4">
              <h3 className="font-semibold">{teamName}</h3>
              <ul>
                {players.map((player: any) => (
                  <li key={player.id}>
                    {player.name} - Skill {player.skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
