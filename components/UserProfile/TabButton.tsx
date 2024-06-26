type TabButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const TabButton = ({ label, isActive, onClick }: TabButtonProps) => (
  <button
    className={`px-4 py-2 font-medium rounded-md ${
      isActive
        ? "text-white bg-gray-800"
        : "text-gray-800 bg-gray-200"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default TabButton;
