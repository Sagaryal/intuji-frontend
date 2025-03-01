interface SubmitButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-custom-gray-3 font-bold text-white py-2 px-3 hover:bg-custom-gray-4 transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
