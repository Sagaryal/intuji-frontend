import PlayerList from "./components/PlayerList";
import TeamList from "./components/TeamList";
import GenerateTeams from "./components/GenerateTeams";

export default function App() {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-custom-gray shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Random Team Generator
      </h1>

      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="flex-1 p-4">
          <PlayerList />
        </div>

        <div className="flex-1 p-4">
          <TeamList />
        </div>
      </div>

      <div className="mt-6">
        <GenerateTeams />
      </div>
    </div>
  );
}
