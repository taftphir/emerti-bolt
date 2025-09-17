import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Zap, Clock } from 'lucide-react';
import { mockVessels } from '../../data/mockData';
import { Vessel } from '../../types/vessel';

export default function VesselMap() {
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapBounds, setMapBounds] = useState({
    north: -6.5,
    south: -7.5,
    east: 115.1,
    west: 112.5
  });
  const [mapCenter, setMapCenter] = useState({ lat: -7.0, lng: 113.8 });
  const [zoomLevel, setZoomLevel] = useState(10);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Convert lat/lng to pixel position within the map container
  const latLngToPixel = (lat: number, lng: number) => {
    if (!mapContainerRef.current) return { x: 50, y: 50 };
    
    const container = mapContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Calculate based on current map bounds and zoom level
    const latRange = mapBounds.north - mapBounds.south;
    const lngRange = mapBounds.east - mapBounds.west;
    
    // Convert to percentage of container
    const x = ((lng - mapBounds.west) / lngRange) * 100;
    const y = ((mapBounds.north - lat) / latRange) * 100;
    
    // Clamp to container bounds
    return { 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    };
  };

  // Update map bounds based on zoom and center
  const updateMapBounds = (center: { lat: number, lng: number }, zoom: number) => {
    // Calculate bounds based on zoom level (approximate)
    const latDelta = 2.0 / Math.pow(2, zoom - 8); // Adjust based on zoom
    const lngDelta = 2.6 / Math.pow(2, zoom - 8);
    
    setMapBounds({
      north: center.lat + latDelta,
      south: center.lat - latDelta,
      east: center.lng + lngDelta,
      west: center.lng - lngDelta
    });
  };

  // Simulate map interaction tracking
  useEffect(() => {
    let animationFrame: number;
    
    const trackMapChanges = () => {
      // Simulate map bounds changes based on user interaction
      // In a real implementation, this would communicate with the iframe
      if (mapLoaded) {
        // Update bounds periodically to simulate map interaction
        updateMapBounds(mapCenter, zoomLevel);
      }
      animationFrame = requestAnimationFrame(trackMapChanges);
    };

    if (mapLoaded) {
      trackMapChanges();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [mapLoaded, mapCenter, zoomLevel]);

  // Handle map load
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
      updateMapBounds(mapCenter, zoomLevel);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  // Simulate pan controls
  const handlePan = (direction: 'north' | 'south' | 'east' | 'west') => {
    const panDelta = 0.1;
    setMapCenter(prev => {
      switch (direction) {
        case 'north': return { ...prev, lat: prev.lat + panDelta };
        case 'south': return { ...prev, lat: prev.lat - panDelta };
        case 'east': return { ...prev, lng: prev.lng + panDelta };
        case 'west': return { ...prev, lng: prev.lng - panDelta };
        default: return prev;
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600';
      case 'Warning': return 'text-yellow-600';
      case 'Critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 border-green-300';
      case 'Warning': return 'bg-yellow-100 border-yellow-300';
      case 'Critical': return 'bg-red-100 border-red-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Vessel Location Map</h2>
        <p className="text-sm sm:text-base text-gray-600">Real-time fleet positioning around Madura Island, Indonesia</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div 
              ref={mapContainerRef}
              className="h-64 sm:h-80 lg:h-96 relative"
            >
              {/* OpenStreetMap iframe with dynamic URL */}
              <iframe
                ref={iframeRef}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapBounds.west}%2C${mapBounds.south}%2C${mapBounds.east}%2C${mapBounds.north}&layer=mapnik&marker=${mapCenter.lat}%2C${mapCenter.lng}`}
                className="w-full h-full border-0"
                title="Madura Island Map"
                onLoad={() => setMapLoaded(true)}
              />
              
              {/* Loading overlay */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-blue-50 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
              
              {/* Map controls */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white rounded-lg shadow-sm p-2 z-20">
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={handleZoomIn}
                    className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-lg font-bold"
                  >
                    +
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="w-8 h-8 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-lg font-bold"
                  >
                    −
                  </button>
                </div>
              </div>

              {/* Pan controls */}
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white rounded-lg shadow-sm p-2 z-20">
                <div className="grid grid-cols-3 gap-1">
                  <div></div>
                  <button
                    onClick={() => handlePan('north')}
                    className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-xs"
                  >
                    ↑
                  </button>
                  <div></div>
                  <button
                    onClick={() => handlePan('west')}
                    className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-xs"
                  >
                    ←
                  </button>
                  <div className="w-6 h-6 bg-gray-100 rounded"></div>
                  <button
                    onClick={() => handlePan('east')}
                    className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-xs"
                  >
                    →
                  </button>
                  <div></div>
                  <button
                    onClick={() => handlePan('south')}
                    className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 text-xs"
                  >
                    ↓
                  </button>
                  <div></div>
                </div>
              </div>
              
              {/* Vessel markers overlay */}
              {mapLoaded && (
                <div className="absolute inset-0 pointer-events-none z-15">
                  {mockVessels.map((vessel) => {
                    const position = latLngToPixel(vessel.position.lat, vessel.position.lng);
                    
                    return (
                      <div
                        key={vessel.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto ${
                          selectedVessel?.id === vessel.id ? 'z-30' : 'z-20'
                        }`}
                        style={{
                          left: `${position.x}%`,
                          top: `${position.y}%`,
                        }}
                        onClick={() => setSelectedVessel(vessel)}
                      >
                        <div className={`relative p-1 rounded-full ${getStatusBg(vessel.status)} border-2 transition-transform hover:scale-110 ${
                          selectedVessel?.id === vessel.id ? 'scale-125' : ''
                        } shadow-lg bg-white`}>
                          <img 
                            src="/ship.png"
                            alt="Vessel"
                            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                            style={{ transform: `rotate(${vessel.heading}deg)` }}
                          />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-white shadow-sm"
                               style={{ backgroundColor: vessel.status === 'Active' ? '#10b981' : vessel.status === 'Warning' ? '#f59e0b' : '#ef4444' }}>
                          </div>
                          {selectedVessel?.id === vessel.id && (
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 sm:p-3 min-w-32 sm:min-w-48 z-50">
                              <h4 className="text-sm sm:text-base font-semibold text-gray-800">{vessel.name}</h4>
                              <div className="text-xs text-gray-600 mt-1 space-y-1">
                                <div className="flex justify-between">
                                  <span>Speed:</span>
                                  <span>{vessel.speed.toFixed(1)} kts</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Heading:</span>
                                  <span>{vessel.heading}°</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Position:</span>
                                  <span>{vessel.position.lat.toFixed(3)}, {vessel.position.lng.toFixed(3)}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {/* Map info and legend */}
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white rounded-lg shadow-sm p-2 sm:p-3 z-20">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">Madura Island</h3>
                <p className="text-xs text-gray-600 mb-2">East Java, Indonesia</p>
                <div className="text-xs text-gray-500">
                  Zoom: {zoomLevel} | Center: {mapCenter.lat.toFixed(3)}, {mapCenter.lng.toFixed(3)}
                </div>
              </div>
              
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white rounded-lg shadow-sm p-2 sm:p-3 z-20">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                    <span className="hidden sm:inline">Active</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <span className="hidden sm:inline">Warning</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <span className="hidden sm:inline">Critical</span>
                  </div>
                </div>
              </div>

              {/* OpenStreetMap attribution */}
              <div className="absolute bottom-0 right-0 bg-white bg-opacity-80 rounded-tl px-2 py-1 z-10">
                <a 
                  href="https://www.openstreetmap.org/copyright" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline"
                >
                  © OpenStreetMap
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Fleet Overview</h3>
            <div className="space-y-3">
              {mockVessels.map((vessel) => (
                <div
                  key={vessel.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedVessel?.id === vessel.id 
                      ? 'bg-blue-50 border-blue-300' 
                      : 'hover:bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => setSelectedVessel(vessel)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800 text-xs sm:text-sm">{vessel.name}</h4>
                    <div className={`w-2 h-2 rounded-full ${
                      vessel.status === 'Active' ? 'bg-green-500' :
                      vessel.status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{vessel.type}</span>
                      <span>{vessel.speed.toFixed(1)} kts</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock size={10} className="mr-1" />
                      <span>{vessel.lastUpdate.toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedVessel && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Vessel Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vessel ID:</span>
                  <span className="font-medium">{selectedVessel.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{selectedVessel.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${getStatusColor(selectedVessel.status)}`}>
                    {selectedVessel.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Speed:</span>
                  <span className="font-medium">{selectedVessel.speed.toFixed(1)} kts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Heading:</span>
                  <span className="font-medium">{selectedVessel.heading}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fuel:</span>
                  <span className="font-medium">{selectedVessel.fuelConsumption.toFixed(1)} L/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lat/Lng:</span>
                  <span className="font-medium text-xs">{selectedVessel.position.lat.toFixed(4)}, {selectedVessel.position.lng.toFixed(4)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}