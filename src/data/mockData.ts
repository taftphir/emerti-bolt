import { Vessel, DashboardStats } from '../types/vessel';

export const mockVessels: Vessel[] = [
  {
    id: 'V001',
    name: 'Sinar Bahari',
    type: 'Cargo',
    status: 'Active',
    position: { lat: -6.8, lng: 113.5 }, // North of Madura Island
    speed: 12.5,
    heading: 45,
    rpmPortside: 1850,
    rpmStarboard: 1820,
    rpmCenter: 1835,
    fuelConsumption: 45.2,
    lastUpdate: new Date()
  },
  {
    id: 'V002',
    name: 'Maritim Jaya',
    type: 'Tanker',
    status: 'Warning',
    position: { lat: -7.1, lng: 114.2 }, // East of Madura Island
    speed: 8.3,
    heading: 180,
    rpmPortside: 1200,
    rpmStarboard: 1180,
    rpmCenter: 1190,
    fuelConsumption: 38.7,
    lastUpdate: new Date()
  },
  {
    id: 'V003',
    name: 'Ocean Pioneer',
    type: 'Container',
    status: 'Active',
    position: { lat: -7.3, lng: 113.9 }, // South of Madura Island
    speed: 15.2,
    heading: 270,
    rpmPortside: 2100,
    rpmStarboard: 2080,
    rpmCenter: 2095,
    fuelConsumption: 52.1,
    lastUpdate: new Date()
  },
  {
    id: 'V004',
    name: 'Nusantara Express',
    type: 'Ferry',
    status: 'Critical',
    position: { lat: -7.0, lng: 113.2 }, // West of Madura Island
    speed: 5.1,
    heading: 90,
    rpmPortside: 800,
    rpmStarboard: 820,
    rpmCenter: 810,
    fuelConsumption: 28.4,
    lastUpdate: new Date()
  }
];

export const getDashboardStats = (): DashboardStats => {
  return {
    totalVessels: mockVessels.length,
    activeVessels: mockVessels.filter(v => v.status === 'Active').length,
    warningCount: mockVessels.filter(v => v.status === 'Warning').length,
    criticalCount: mockVessels.filter(v => v.status === 'Critical').length
  };
};

// Generate hourly data for charts
export const generateHourlyData = (vessel: Vessel) => {
  const hours = [];
  const speedData = [];
  const rpmData = [];
  const fuelData = [];

  for (let i = 0; i < 24; i++) {
    hours.push(`${i.toString().padStart(2, '0')}:00`);
    speedData.push(vessel.speed + (Math.random() - 0.5) * 4);
    rpmData.push(vessel.rpmPortside + (Math.random() - 0.5) * 200);
    fuelData.push(vessel.fuelConsumption + (Math.random() - 0.5) * 10);
  }

  return { hours, speedData, rpmData, fuelData };
};