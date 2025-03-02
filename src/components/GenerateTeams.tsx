import { useState } from "react";
import { api } from "../services/api";
import DisplayTeam from "./ui/DisplayTeam";
import ShareLink from "./ui/ShareLink";
import { ResponseData } from "../types";
import TeamHeader from "./ui/TeamHeader";

export default function GenerateTeams() {
  const [data, setData] = useState<ResponseData | null>(null);

  const [shareLink, setShareLink] = useState<string | null>(null);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!inputTitle.trim()) {
      setError("Title is required!"); // Set the error message
      return;
    }
    setError(null);

    try {
      const response = await api.post("/teams/generate-teams", {
        title: inputTitle,
      });
      setData({
        title: response.data.title,
        uniqueId: response.data.uniqueId,
        teams: response.data.teams,
      });
      setShareLink(`http://localhost:5173/team-${response.data.uniqueId}`);
    } catch (err) {
      setError("Error generating teams. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mt-4 mb-2">Generate Teams</h2>
      <div className="mt-2 flex items-center space-x-0">
        <input
          id="title"
          type="text"
          value={inputTitle}
          placeholder="Title for the match"
          onChange={(e) => setInputTitle(e.target.value)}
          className="h-10 w-sm px-3 py-2 border border-custom-gray-2 bg-white"
        />
        <button
          onClick={handleGenerate}
          className="h-10 bg-blue-500 text-white px-4 py-2 hover:cursor-pointer"
        >
          Generate Balanced Teams
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {data?.teams && <TeamHeader data={data.teams} title={data.title} />}

      {shareLink && <ShareLink url={shareLink} />}

      {data?.teams && <DisplayTeam data={data.teams} />}
    </div>
  );
}
