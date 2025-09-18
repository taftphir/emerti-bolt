import { Vessel, DashboardStats } from '../types/vessel';

export const mockVessels: Vessel[] = [
  {
    id: 'V001',
    name: 'Sinar Bahari',
    type: 'Cargo',
    status: 'Active',
    position: { lat: -6.7, lng: 113.8 }, // North of Madura Island (sea)
    speed: 12.5,
    heading: 135, // Southeast direction
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
    position: { lat: -7.0, lng: 114.3 }, // East of Madura Island (sea)
    speed: 8.3,
    heading: 270, // West direction
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
    position: { lat: -7.4, lng: 113.6 }, // South of Madura Island (sea)
    speed: 15.2,
    heading: 45, // Northeast direction
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
    position: { lat: -6.9, lng: 112.7 }, // West of Madura Island (sea)
    speed: 5.1,
    heading: 90, // East direction
    rpmPortside: 800,
    rpmStarboard: 820,
    rpmCenter: 810,
    fuelConsumption: 28.4,
    lastUpdate: new Date()
  },
  {
    id: 'V005',
    name: 'Bahari Utama',
    type: 'Cargo',
    status: 'Active',
    position: { lat: -6.8, lng: 114.0 },
    speed: 11.2,
    heading: 180,
    rpmPortside: 1750,
    rpmStarboard: 1730,
    rpmCenter: 1740,
    fuelConsumption: 42.8,
    lastUpdate: new Date()
  },
  {
    id: 'V006',
    name: 'Samudra Indah',
    type: 'Tanker',
    status: 'Active',
    position: { lat: -7.2, lng: 113.2 },
    speed: 9.8,
    heading: 315,
    rpmPortside: 1400,
    rpmStarboard: 1380,
    rpmCenter: 1390,
    fuelConsumption: 35.5,
    lastUpdate: new Date()
  },
  {
    id: 'V007',
    name: 'Pelita Laut',
    type: 'Container',
    status: 'Warning',
    position: { lat: -6.6, lng: 113.5 },
    speed: 13.7,
    heading: 225,
    rpmPortside: 1950,
    rpmStarboard: 1920,
    rpmCenter: 1935,
    fuelConsumption: 48.3,
    lastUpdate: new Date()
  },
  {
    id: 'V008',
    name: 'Jaya Makmur',
    type: 'Ferry',
    status: 'Active',
    position: { lat: -7.1, lng: 114.1 },
    speed: 16.4,
    heading: 60,
    rpmPortside: 1650,
    rpmStarboard: 1670,
    rpmCenter: 1660,
    fuelConsumption: 31.2,
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