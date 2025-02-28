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
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Generate Balanced Teams
      </button>

      {generatedTeams && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border p-4 rounded-md">
          {Object.entries(generatedTeams).map(([teamName, players]) => (
            <div key={teamName} className="bg-gray-100 p-4 rounded-md">
              <h3 className="font-semibold mb-2">
                {teamName} ({players.length})
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {players.map((player: any, index: number) => (
                  <div key={player.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={`${index + 1}. ${player.name}`}
                      readOnly
                      className="flex-1 border rounded-md px-2 py-1 bg-white"
                    />
                    <input
                      type="text"
                      value={player.skill}
                      readOnly
                      className="w-10 text-center bg-red-500 text-white font-semibold rounded-md"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 text-right font-semibold">
                {players.reduce((sum, p) => sum + p.skill, 0)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
