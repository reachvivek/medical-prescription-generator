import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, FileText, LayoutDashboard } from 'lucide-react';
import { useToast } from '../ui/Toast';
import Button from '../ui/Button';

const MockHeader = () => {
  const navigate = useNavigate();
  const toast = useToast();

  // Get mock profile from localStorage
  const mockProfile = JSON.parse(localStorage.getItem('mock_profile') || '{}');

  const handleSignout = () => {
    localStorage.removeItem('mock_auth');
    localStorage.removeItem('mock_user');
    localStorage.removeItem('mock_profile');
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <FileText className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Medical Rx
              </span>
              <span className="ml-2 text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
                DEMO
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/dashboard"
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/create-prescription"
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
            >
              <FileText className="h-5 w-5 mr-2" />
              New Prescription
            </Link>
            <Link
              to="/profile"
              className="flex items-center text-gray-700 hover:text-primary-600 transition-colors"
            >
              <User className="h-5 w-5 mr-2" />
              Profile
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {mockProfile.full_name || 'Demo Doctor'}
              </p>
              <p className="text-xs text-gray-500">
                {mockProfile.specialty || 'General Physician'}
              </p>
            </div>
            <Button
              onClick={handleSignout}
              variant="ghost"
              size="sm"
              className="flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit Demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MockHeader;
