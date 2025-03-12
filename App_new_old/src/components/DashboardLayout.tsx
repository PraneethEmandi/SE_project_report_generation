
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from './Sidebar';
import ProfileDropdown from './ProfileDropdown';
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate('/login');
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-student-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-200 py-3 px-6 flex justify-between items-center border-b border-gray-300">
          <h1 className="text-xl font-bold text-gray-800">Student Platform</h1>
          <ProfileDropdown />
        </header>
        
        <main className="flex-1 overflow-y-auto bg-blue-50/50 p-6">
          {title && (
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
