import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import { TeamProvider } from "./context/TeamContext";
import AddPlayer from "./components/AddPlayer";
import PlayerList from "./components/PlayerList";
import AddTeam from "./components/AddTeam";
import TeamList from "./components/TeamList";
import GenerateTeams from "./components/GenerateTeams";
import ParticipantsList from "./components/ParticipantsList";

export default function App() {
  return (
    <Router>
      <PlayerProvider>
        <TeamProvider>
          <ParticipantsList />
          <div className="max-w-lg mx-auto mt-10 p-4">
            <h1 className="text-xl font-bold mb-4">Random Team Generator</h1>
            <AddPlayer />
            <PlayerList />
            <AddTeam />
            <TeamList />
            <GenerateTeams />
          </div>
        </TeamProvider>
      </PlayerProvider>
    </Router>
  );
}
