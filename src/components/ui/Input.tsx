import { useState } from "react";

interface InputProps {
  value: string;
  editable: boolean;
  onChange: (val: string) => void;
  onBlur: () => void;
  onClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  value,
  editable,
  onChange,
  onBlur,
  onClick,
}) => {
  const [enterPressed, setEnterPressed] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setEnterPressed(true);
      onBlur();
    }
  };

  const handleBlur = () => {
    if (!enterPressed) {
      onBlur(); // Only call onBlur if Enter wasn't pressed
    }
    setEnterPressed(false); // Reset the flag
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={handleBlur}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      autoFocus={editable}
      className={`flex-1 p-1 pl-2 border-custom-gray-2 border bg-white  ${
        !editable && "cursor-pointer"
      }`}
      readOnly={!editable}
    />
  );
};

export default Input;
