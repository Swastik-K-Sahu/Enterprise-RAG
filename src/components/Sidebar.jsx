import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-100 text-black h-full flex flex-col p-4">

      <div className="flex items-center mb-6">
        <img src='./logo.webp' alt='logo' className="h-10 w-10 mr-2" /> 
        <h2 className="text-2xl font-bold">MyCompany</h2>
      </div>

      <ul className="sidebar-list space-y-4">
        <li>
          <Link
            to="/"
            className="block py-2 px-8 text-lg rounded-lg hover:bg-blue-700 hover:text-white transition-colors duration-200"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/upload"
            className="block py-2 px-8 text-lg rounded-lg hover:bg-blue-700 hover:text-white transition-colors duration-200"
          >
            KnowledgeBase
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
