import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "../services/api";
import DisplayTeam from "../components/ui/DisplayTeam";
import { RiseLoader } from "react-spinners";
import { MdOutlineGroups } from "react-icons/md";
import { ResponseData } from "../types";
import TeamHeader from "../components/ui/TeamHeader";

const GeneratedTeamPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const uniqueId = slug?.replace(/^team-/, "");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await get<ResponseData>(
          `/teams/generated-teams/${uniqueId}`
        );
        setData({
          title: data.title,
          uniqueId: data.uniqueId,
          teams: data.teams,
        });
      } catch (err: any) {
        if (err.response?.status === 404) {
          navigate("/404", { replace: true });
        } else {
          setError("Failed to load generated team. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <RiseLoader size={20} color="#3b82f6" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md text-center mb-4">
          {error}
        </div>
      )}

      {!error && data?.teams ? (
        <div className="bg-gray-100 p-4 rounded-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Generated Team
          </h1>
          {data?.teams && <TeamHeader data={data.teams} title={data.title} />}

          <DisplayTeam data={data.teams} />
        </div>
      ) : (
        !error &&
        !data?.teams && (
          <div className="flex flex-col items-center justify-center text-center bg-custom-gray p-6 rounded-lg">
            <MdOutlineGroups className="text-gray-400 text-6xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">
              No Team Data Found
            </h2>
            <p className="text-gray-500">
              We couldn't find any team information. Try generating a team or
              check your input.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default GeneratedTeamPage;
