import { BsPinMapFill } from "react-icons/bs";
import { FaSearchLocation, FaUserAlt } from 'react-icons/fa'

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 border border-gray-700 shadow-lg">
      <SidebarIcon icon={<FaSearchLocation size="20"/>} />
      <SidebarIcon icon={<BsPinMapFill size="20"/>} />
      <SidebarIcon icon={<FaUserAlt size="20"/>} />
    </div>
  );
}

const SidebarIcon = ({ icon }) => {
  return (
    <div
      className="relative flex items-center justify-center 
        h-16 w-16 mt-2 mb-2 mx-auto bg-gray-400 hover:bg-green-600
        dark:bg-gray-800 text-green-500 hover:text-white hover:rounded-xl
        rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg"
    >
      {icon}
    </div>
  );
};