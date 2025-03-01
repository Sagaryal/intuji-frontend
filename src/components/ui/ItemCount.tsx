interface ItemCountProps {
  children: React.ReactNode;
  className?: string;
}

const ItemCount: React.FC<ItemCountProps> = ({ children, className }) => {
  return (
    <span
      className={`font-bold text-gray-700 bg-custom-gray-2 px-3 py-2 border-r border-gray-400 ${className}`}
    >
      {children}
    </span>
  );
};

export default ItemCount;
