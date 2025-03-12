
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-gray-200 py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Student Platform
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link to="/about" className="text-gray-800 hover:text-student-600">
            About
          </Link>
          <Link to="/features" className="text-gray-800 hover:text-student-600">
            Features
          </Link>
          <Link to="/contact" className="text-gray-800 hover:text-student-600">
            Contact
          </Link>
        </nav>

        <div>
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="default" className="bg-black text-white">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" className="bg-black text-white">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
