import { Vessel, DashboardStats } from '../types/vessel';
import { HistoryRecord } from '../types/vessel';

export const mockVessels: Vessel[] = [
  {
    id: 'V001',
    name: 'Sinar Bahari',
    type: 'Cargo',
    status: 'Active',
    image: 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=400',
    owner: 'PT Sinar Bahari Shipping',
    vtsActive: true,
    emsActive: true,
    fmsActive: true,
    vesselKey: 'SB001-2024-CARGO',
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
    image: 'https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=400',
    owner: 'CV Maritim Jaya',
    vtsActive: true,
    emsActive: false,
    fmsActive: true,
    vesselKey: 'MJ002-2024-TANKER',
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
    image: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=400',
    owner: 'PT Ocean Pioneer Lines',
    vtsActive: true,
    emsActive: true,
    fmsActive: false,
    vesselKey: 'OP003-2024-CONTAINER',
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
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
    owner: 'PT Nusantara Ferry',
    vtsActive: false,
    emsActive: true,
    fmsActive: true,
    vesselKey: 'NE004-2024-FERRY',
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
    image: 'https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=400',
    owner: 'PT Bahari Utama',
    vtsActive: true,
    emsActive: true,
    fmsActive: true,
    vesselKey: 'BU005-2024-CARGO',
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
    image: 'https://images.pexels.com/photos/163236/luxury-yacht-boat-speed-water-163236.jpeg?auto=compress&cs=tinysrgb&w=400',
    owner: 'CV Samudra Indah',
    vtsActive: true,
    emsActive: true,
    fmsActive: true,
    vesselKey: 'SI006-2024-TANKER',
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
    image: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=400',
    owner: 'PT Pelita Laut Shipping',
    vtsActive: true,
    emsActive: true,
    fmsActive: false,
    vesselKey: 'PL007-2024-CONTAINER',
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
    image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400',
    owner: 'PT Jaya Makmur Ferry',
    vtsActive: true,
    emsActive: true,
    fmsActive: true,
    vesselKey: 'JM008-2024-FERRY',
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

// Generate mock history data
export const generateHistoryData = (): HistoryRecord[] => {
  const records: HistoryRecord[] = [];
  const now = new Date();
  
  mockVessels.forEach((vessel) => {
    if (vessel.name != 'Sinar Bahari') {
      // Generate 100 records per vessel over the last 7 days
      for (let i = 0; i < 100; i++) {
        const timestamp = new Date(now.getTime() - (i * 2 * 60 * 60 * 1000)); // Every 2 hours
        records.push({
          id: `${vessel.id}-${i}`,
          vesselId: vessel.id,
          vesselName: vessel.name,
          timestamp,
          latitude: vessel.position.lat + (Math.random() - 0.5) * 0.1,
          longitude: vessel.position.lng + (Math.random() - 0.5) * 0.1,
          speed: Math.max(0, vessel.speed + (Math.random() - 0.5) * 8),
          heading: Math.floor(Math.random() * 360),
          rpmPortside: Math.max(0, vessel.rpmPortside + (Math.random() - 0.5) * 400),
          rpmStarboard: Math.max(0, vessel.rpmStarboard + (Math.random() - 0.5) * 400),
          rpmCenter: Math.max(0, vessel.rpmCenter + (Math.random() - 0.5) * 400),
        });
      }
      else {
        records.push({
          id: `${vessel.id}-${i}`,
          vesselId: vessel.id,
          vesselName: vessel.name,
          timestamp,
          latitude: -7.38542,
          longitude: 113.839851,
          speed: Math.max(0, vessel.speed + (Math.random() - 0.5) * 8),
          heading: Math.floor(Math.random() * 360),
          rpmPortside: Math.max(0, vessel.rpmPortside + (Math.random() - 0.5) * 400),
          rpmStarboard: Math.max(0, vessel.rpmStarboard + (Math.random() - 0.5) * 400),
          rpmCenter: Math.max(0, vessel.rpmCenter + (Math.random() - 0.5) * 400),
        });
      }
        records.push({
          id: `${vessel.id}-${i}`,
          vesselId: vessel.id,
          vesselName: vessel.name,
          timestamp,
          latitude: -7.384068,
          longitude: 113.83886,
          speed: Math.max(0, vessel.speed + (Math.random() - 0.5) * 8),
          heading: Math.floor(Math.random() * 360),
          rpmPortside: Math.max(0, vessel.rpmPortside + (Math.random() - 0.5) * 400),
          rpmStarboard: Math.max(0, vessel.rpmStarboard + (Math.random() - 0.5) * 400),
          rpmCenter: Math.max(0, vessel.rpmCenter + (Math.random() - 0.5) * 400),
        });
      }
        records.push({
          id: `${vessel.id}-${i}`,
          vesselId: vessel.id,
          vesselName: vessel.name,
          timestamp,
          latitude: -7.383173,
          longitude: 113.838173,
          speed: Math.max(0, vessel.speed + (Math.random() - 0.5) * 8),
          heading: Math.floor(Math.random() * 360),
          rpmPortside: Math.max(0, vessel.rpmPortside + (Math.random() - 0.5) * 400),
          rpmStarboard: Math.max(0, vessel.rpmStarboard + (Math.random() - 0.5) * 400),
          rpmCenter: Math.max(0, vessel.rpmCenter + (Math.random() - 0.5) * 400),
        });
        records.push({
          id: `${vessel.id}-${i}`,
          vesselId: vessel.id,
          vesselName: vessel.name,
          timestamp,
          latitude: -7.382483,
          longitude: 113.8377,
          speed: Math.max(0, vessel.speed + (Math.random() - 0.5) * 8),
          heading: Math.floor(Math.random() * 360),
          rpmPortside: Math.max(0, vessel.rpmPortside + (Math.random() - 0.5) * 400),
          rpmStarboard: Math.max(0, vessel.rpmStarboard + (Math.random() - 0.5) * 400),
          rpmCenter: Math.max(0, vessel.rpmCenter + (Math.random() - 0.5) * 400),
        });
      }
    }
  });
  
  return records.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
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