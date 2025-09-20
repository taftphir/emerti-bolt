import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import LatestData from './components/Monitoring/LatestData';
import VesselMap from './components/Monitoring/VesselMap';
import VesselTracking from './components/Monitoring/VesselTracking';
import DataHistory from './components/Monitoring/DataHistory';
import DailyReport from './components/Monitoring/DailyReport';
import UserManagement from './components/Configuration/UserManagement';
import VesselManagement from './components/Configuration/VesselManagement';
import VesselTypeManagement from './components/Configuration/VesselTypeManagement';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [trackingVesselId, setTrackingVesselId] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleShowTracking = (vesselId: string) => {
    setTrackingVesselId(vesselId);
    setActiveSection('vessel-tracking');
  };

  const handleBackFromTracking = () => {
    setTrackingVesselId(null);
    setActiveSection('map');
  };
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'latest-data':
        return <LatestData />;
      case 'map':
        return <VesselMap onShowTracking={handleShowTracking} />;
      case 'vessel-tracking':
        return <VesselTracking vesselId={trackingVesselId || undefined} onBack={handleBackFromTracking} />;
      case 'data-history':
        return <DataHistory />;
      case 'daily-report':
        return <DailyReport />;
      case 'users':
        return <UserManagement />;
      case 'vessels':
        return <VesselManagement />;
      case 'vessel-types':
        return <VesselTypeManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeSection={activeSection} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-2 sm:p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;