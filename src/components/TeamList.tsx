import { api } from "../services/api";
import { useTeams } from "../context/TeamContext";

export default function TeamList() {
  const { teams, fetchTeams } = useTeams();

  const handleDelete = async (id: number) => {
    await api.delete(`/teams/${id}`);
    fetchTeams();
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Teams</h2>
      <ul className="border p-2 rounded-md">
        {teams.map((team) => (
          <li key={team.id} className="flex justify-between p-2 border-b">
            {team.name}
            <button
              onClick={() => handleDelete(team.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
