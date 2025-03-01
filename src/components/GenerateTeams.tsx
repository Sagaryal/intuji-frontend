import { useState } from "react";
import { api } from "../services/api";
import { FiExternalLink, FiCopy } from "react-icons/fi";
import GeneratedTeam from "./ui/GeneratedTeam";

export default function GenerateTeams() {
  const [generatedTeams, setGeneratedTeams] = useState<Record<
    string,
    any[]
  > | null>(null);

  const [shareLink, setShareLink] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");

  const handleGenerate = async () => {
    const response = await api.post("/teams/generate-teams");
    setGeneratedTeams(response.data.teamResults);
    setShareLink(`http://localhost:5173/team-${response.data.uniqueId}`);
  };

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4 mb-2">Generate Teams</h2>
      <div className="mt-2 flex items-center space-x-0">
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Title for the match"
          onChange={(e) => setTitle(e.target.value)} // Update title on change
          className="h-10 w-sm px-3 py-2 border border-custom-gray-2 bg-white"
        />
        <button
          onClick={handleGenerate}
          className="h-10 bg-blue-500 text-white px-4 py-2 hover:cursor-pointer"
        >
          Generate Balanced Teams
        </button>
      </div>

      <div>
        {shareLink && (
          <>
            <div className="bg-gray-800 text-white p-4 mt-6">
              <h2 className="text-lg font-semibold">Friday Futsal</h2>
              <p className="text-sm">10 participants in 2 teams</p>
            </div>
            <div className="mt-4 p-4 bg-gray-100">
              {/* Share Link Header */}
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">Share Link</h3>
                <span className="text-gray-500 text-sm ml-2">
                  (Public draw)
                </span>
                <a
                  href={shareLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-custom-gray-3 hover:text-gray-600"
                >
                  <FiExternalLink size={16} />
                </a>
              </div>

              {/* Share Link Input + Copy Button */}
              <div className="mt-2 flex items-center">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="w-md h-8 border border-custom-gray-2 border-r-0 px-3 py-1 bg-white text-gray-700"
                />
                <button
                  onClick={copyToClipboard}
                  className="h-8 border border-custom-gray-2 bg-gray-300 hover:bg-gray-400 px-3 py-1 text-sm hover:cursor-pointer"
                >
                  <FiCopy size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <GeneratedTeam data={generatedTeams} />
    </div>
  );
}
