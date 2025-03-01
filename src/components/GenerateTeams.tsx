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
    <div className="mt-4 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-2">Generate Teams</h2>
      <button
        onClick={handleGenerate}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Generate Balanced Teams
      </button>

      {generatedTeams && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {Object.entries(generatedTeams).map(([teamName, players]) => (
            <div key={teamName} className="w-full">
              {/* Team Name Header */}
              <h3 className="font-semibold mb-2 text-lg">
                {teamName}{" "}
                <span className="text-gray-400">({players.length})</span>
              </h3>

              {/* Player List */}
              <div className="space-y-2">
                {players.map((player: any, index: number) => (
                  <div
                    key={player.id}
                    className="flex items-center bg-gray-100"
                  >
                    {/* Number Box (Same Height as Input) */}
                    <span className="w-8 h-full flex items-center justify-center bg-custom-gray px-2 py-1 border border-r-0 border-custom-gray-2 text-custom-gray-2 font-medium">
                      {index + 1}
                    </span>

                    {/* Player Name (Added Right Margin for Spacing) */}
                    <input
                      type="text"
                      value={player.name}
                      readOnly
                      className="flex-1 border border-custom-gray-2 px-2 py-1 bg-white mr-2"
                    />

                    {/* Skill Score */}
                    <span className="w-10 h-8 flex items-center justify-center bg-custom-orange text-white font-semibold">
                      {player.skill}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Score */}
              <div className="mt-2 flex justify-end">
                <span className="w-10 text-center text-gray-400 font-semibold">
                  {players.reduce((sum, p) => sum + p.skill, 0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
