import React from 'react';
import { 
  BarChart3, 
  Map, 
  Activity, 
  FileBarChart, 
  Settings, 
  Users,
  Ship,
  Layers,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'latest-data', label: 'Latest Data', icon: Activity, parent: 'monitoring' },
  { id: 'map', label: 'Map Lokasi', icon: Map, parent: 'monitoring' },
  { id: 'daily-report', label: 'Daily Report', icon: FileBarChart, parent: 'monitoring' },
  { id: 'users', label: 'User Management', icon: Users, parent: 'configuration' },
  { id: 'vessels', label: 'Vessel Management', icon: Ship, parent: 'configuration' },
  { id: 'vessel-types', label: 'Vessel Types', icon: Layers, parent: 'configuration' },
];

const sections = {
  monitoring: 'Monitoring',
  configuration: 'Configuration'
};

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-900 text-white p-2 rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        bg-blue-900 text-white min-h-screen p-4 transition-transform duration-300 ease-in-out z-40
        lg:relative lg:translate-x-0 lg:w-64
        fixed w-64 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
      <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-orange-400">E-Merti</h1>
          <p className="text-blue-300 text-xs sm:text-sm">Vessel Monitoring</p>
      </div>
      
      <nav>
        {menuItems.map((item) => {
          if (!item.parent) {
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 text-left transition-colors ${
                  activeSection === item.id 
                    ? 'bg-orange-600 text-white' 
                    : 'text-blue-200 hover:bg-blue-800'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          }
          return null;
        })}

        {Object.entries(sections).map(([sectionId, sectionLabel]) => (
          <div key={sectionId} className="mt-6">
            <h3 className="text-blue-300 text-xs sm:text-sm font-semibold mb-2 px-4">{sectionLabel}</h3>
            {menuItems
              .filter(item => item.parent === sectionId)
              .map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-6 py-2 rounded-lg mb-1 text-left transition-colors ${
                    activeSection === item.id 
                      ? 'bg-orange-600 text-white' 
                      : 'text-blue-200 hover:bg-blue-800'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-xs sm:text-sm">{item.label}</span>
                </button>
              ))}
          </div>
        ))}
      </nav>
      </div>
    </>
  );
}