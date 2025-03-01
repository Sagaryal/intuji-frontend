import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import GeneratedTeam from "../components/ui/GeneratedTeam";

const GeneratedTeamPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const uniqueId = slug?.replace(/^team-/, "");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/teams/generated-teams/${uniqueId}`);
        setData(response.data);
      } catch (err) {
        setError("Failed to load generated team. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Generated Team
      </h1>

      {loading && (
        <div className="flex justify-center items-center py-6">
          <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md text-center mb-4">
          {error}
        </div>
      )}

      {!loading && !error && data ? (
        <div className="bg-gray-100 p-4 rounded-md">
          <GeneratedTeam data={data} />
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-gray-500">No team data found.</p>
        )
      )}
    </div>
  );
};

export default GeneratedTeamPage;
