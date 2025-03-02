interface TeamHeaderProps {
  title: string;
  data: Record<string, any[]>;
}

const TeamHeader = ({ title, data }: TeamHeaderProps) => {
  const totalParticipants = data
    ? Object.values(data).reduce((acc, players) => acc + players.length, 0)
    : 0;

  const totalTeams = data ? Object.keys(data).length : 0;

  return (
    <div className="bg-gray-800 text-white p-4 mt-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">
        {totalParticipants} participants in {totalTeams} teams
      </p>
    </div>
  );
};

export default TeamHeader;
