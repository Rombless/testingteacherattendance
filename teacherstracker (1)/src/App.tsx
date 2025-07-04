/**
 * Main App component with routing and navigation
 */
import { HashRouter, Route, Routes, Link, useLocation } from 'react-router';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import Dashboard from './pages/Dashboard';
import Teachers from './pages/Teachers';
import DailyAttendance from './pages/DailyAttendance';
import Home from './pages/Home';
import { 
  Home as HomeIcon, 
  Users, 
  Calendar, 
  BarChart3,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: HomeIcon },
    { path: '/teachers', label: 'Teachers', icon: Users },
    { path: '/daily-attendance', label: 'Daily Attendance', icon: Calendar },
    { path: '/individual-tracking', label: 'Individual Tracking', icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-white shadow-md"
        >
          {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r transform transition-transform z-40 ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Teacher Portal</h1>
              <p className="text-sm text-gray-600">Attendance System</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">System Active</h3>
                <p className="text-xs text-gray-600">Attendance tracking enabled</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/daily-attendance" element={<DailyAttendance />} />
          <Route path="/individual-tracking" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}