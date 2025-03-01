import React, { useState } from "react";

interface RatingSkillProps {
  skill: number;
  onRate: (rating: number) => void;
}

const RatingSkill: React.FC<RatingSkillProps> = ({ skill, onRate }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex ml-2 space-x-0">
      {[1, 2, 3, 4, 5].map((num) => (
        <button
          key={num}
          className={`px-3 py-1 text-white transition-all ${
            (hovered !== null ? hovered >= num : skill >= num)
              ? "bg-custom-orange"
              : "bg-gray-300"
          }`}
          onClick={() => onRate(num)}
          onMouseEnter={() => setHovered(num)}
          onMouseLeave={() => setHovered(null)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default RatingSkill;
