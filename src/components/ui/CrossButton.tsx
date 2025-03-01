interface CrossButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CrossButton: React.FC<CrossButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-full flex items-center justify-center bg-custom-gray px-2 py-1 border border-r-0 border-custom-gray-2 text-custom-gray-2 font-bold ${className}`}
    >
      {children}
    </button>
  );
};

export default CrossButton;
