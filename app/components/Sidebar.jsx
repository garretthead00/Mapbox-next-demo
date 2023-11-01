import { BsPinMapFill } from "react-icons/bs";
import { FaSearchLocation, FaUserAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="fixed absolute z-10 t-0 l-0 p-2">
      <SidebarIcon icon={<FaSearchLocation size="20" />} />
      <SidebarIcon icon={<BsPinMapFill size="20" />} />
      <SidebarIcon icon={<FaUserAlt size="20" />} />
    </div>
  );
}

const SidebarIcon = ({ icon }) => {
  return (
    <div
      className="relative flex items-center justify-center 
        h-12 w-12 mt-2 mb-2 mx-auto bg-gray-400 hover:bg-green-600
        dark:bg-gray-800 text-green-600 hover:text-white hover:rounded-2xl
        rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg"
    >
      {icon}
    </div>
  );
};
