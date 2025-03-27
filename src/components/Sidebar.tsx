
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileBarChart2, 
  Code2, 
  Briefcase, 
  Calendar, 
  ShieldCheck, 
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';

const Sidebar = () => {
  const location = useLocation();
  const { isOpen, toggle } = useSidebar();

  const menuItems = [
    { path: '/dashboard', label: 'Home', icon: <Home size={20} /> },
    { path: '/temp', label: 'Dashboard Builder', icon: <FileBarChart2 size={20} /> },
    { path: '/query-builder', label: 'Query Builder', icon: <Code2 size={20} /> },
    { path: '/placement-data', label: 'Placement Data', icon: <Briefcase size={20} /> },
    { path: '/events-data', label: 'Events Data', icon: <Calendar size={20} /> },
    { path: '/administration-data', label: 'Administration Data', icon: <ShieldCheck size={20} /> },
  ];

  return (
    <div className={cn(
      "h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
      isOpen ? "w-56" : "w-20"
    )}>
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        {isOpen && <h2 className="font-semibold text-gray-800">Navigation</h2>}
        <button onClick={toggle} className="p-2 rounded-md hover:bg-gray-100">
          <Menu size={20} />
        </button>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md transition-colors",
                  location.pathname === item.path 
                    ? "bg-student-100 text-student-700" 
                    : "text-gray-600 hover:bg-gray-100",
                  !isOpen && "justify-center"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
