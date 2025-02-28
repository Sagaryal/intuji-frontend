import { useState } from "react";

const participantsData = [
  "Ram",
  "Shyam",
  "Hari",
  "Vijay",
  "Kitaa",
  "test 1",
  "test 2",
  "tst 3",
  "tst 4",
  "tst 5",
];

export default function ParticipantsList() {
  const [participants, setParticipants] = useState(participantsData);
  const [ratings, setRatings] = useState({});

  const handleAddParticipant = () => {
    const newParticipant = `Player ${participants.length + 1}`;
    setParticipants([...participants, newParticipant]);
  };

  const handleRating = (name, rating) => {
    setRatings({ ...ratings, [name]: rating });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-auto bg-white shadow-md p-4 min-w-[24rem]">
        <h2 className="font-bold text-lg mb-4">Participants</h2>
        {participants.map((participant, index) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <button
              className="text-red-500 font-bold mr-2"
              onClick={() =>
                setParticipants(participants.filter((_, i) => i !== index))
              }
            >
              ×
            </button>
            <input
              type="text"
              value={participant}
              readOnly
              className="flex-1 p-1 border"
            />
            <div className="flex ml-2 space-x-0 flex-wrap">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  className={`px-2 py-1 text-white transition-all ${
                    ratings[participant] >= num
                      ? "bg-red-500 scale-105"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => handleRating(participant, num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center mt-4">
          <span className="font-bold text-gray-700 bg-gray-200 px-4 py-2 border-r border-gray-400">
            {participants.length}
          </span>
          <button
            onClick={handleAddParticipant}
            className="bg-gray-700 text-white py-2 px-4 hover:bg-gray-800 transition-all"
          >
            Add Participant
          </button>
        </div>
      </div>
    </div>
  );
}
