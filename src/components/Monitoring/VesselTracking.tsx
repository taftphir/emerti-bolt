import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Navigation, Clock, Route, Play, Pause, RotateCcw } from 'lucide-react';
import { mockVessels, generateHistoryData } from '../../data/mockData';
import { Vessel, HistoryRecord } from '../../types/vessel';

interface VesselTrackingProps {
  vesselId?: string;
  onBack?: () => void;
}

export default function VesselTracking({ vesselId, onBack }: VesselTrackingProps) {
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [trackingData, setTrackingData] = useState<HistoryRecord[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Map bounds for tracking area
  const mapBounds = {
    north: -6.5,
    south: -7.5,
    east: 115.1,
    west: 112.5
  };

  useEffect(() => {
    // Initialize with vessel from props or first vessel
    const vessel = vesselId 
      ? mockVessels.find(v => v.id === vesselId) || mockVessels[0]
      : mockVessels[0];
    
    setSelectedVessel(vessel);
    
    // Get tracking data for selected vessel
    const allHistory = generateHistoryData();
    const vesselHistory = allHistory
      .filter(record => record.vesselId === vessel.id)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    setTrackingData(vesselHistory);
    setCurrentIndex(vesselHistory.length - 1);
  }, [vesselId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && trackingData.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= trackingData.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, trackingData.length]);

  const latLngToPixel = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
    const y = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const handleVesselChange = (vesselId: string) => {
    const vessel = mockVessels.find(v => v.id === vesselId);
    if (vessel) {
      setSelectedVessel(vessel);
      const allHistory = generateHistoryData();
      const vesselHistory = allHistory
        .filter(record => record.vesselId === vesselId)
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      
      setTrackingData(vesselHistory);
      setCurrentIndex(vesselHistory.length - 1);
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
  };

  const currentPosition = trackingData[currentIndex];
  const visibleTrack = trackingData.slice(0, currentIndex + 1);

  if (!selectedVessel) return null;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back to Map</span>
            </button>
          )}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Vessel Tracking</h2>
            <p className="text-sm text-gray-600">Real-time vessel movement tracking</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Vessel
            </label>
            <select
              value={selectedVessel.id}
              onChange={(e) => handleVesselChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {mockVessels.map((vessel) => (
                <option key={vessel.id} value={vessel.id}>
                  {vessel.name} ({vessel.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Range
            </label>
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="1h">Last 1 Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Playback Speed
            </label>
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={5}>5x</option>
            </select>
          </div>

          <div className="flex items-end space-x-2">
            <button
              onClick={handlePlayPause}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm ${
                isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Route className="mr-2" size={20} />
                Tracking Map - {selectedVessel.name}
              </h3>
            </div>
            
            <div className="h-96 sm:h-[500px] relative">
              {/* Base Map */}
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=112.5%2C-7.5%2C115.1%2C-6.5&layer=mapnik"
                className="w-full h-full border-0"
                title="Vessel Tracking Map"
                onLoad={() => setMapLoaded(true)}
              />
              
              {/* Loading overlay */}
              {!mapLoaded && (
                <div className="absolute inset-0 bg-blue-50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading tracking map...</p>
                  </div>
                </div>
              )}
              
              {/* Tracking overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Track path */}
                <svg className="w-full h-full">
                  {visibleTrack.length > 1 && (
                    <polyline
                      points={visibleTrack
                        .map(point => {
                          const pos = latLngToPixel(point.latitude, point.longitude);
                          return `${(pos.x / 100) * window.innerWidth},${(pos.y / 100) * window.innerHeight}`;
                        })
                        .join(' ')}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeOpacity="0.7"
                      strokeDasharray="5,5"
                    />
                  )}
                </svg>
                
                {/* Historical markers */}
                {visibleTrack.slice(0, -1).map((point, index) => {
                  const position = latLngToPixel(point.latitude, point.longitude);
                  return (
                    <div
                      key={`${point.id}-${index}`}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                      }}
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                    </div>
                  );
                })}
                
                {/* Current position marker */}
                {currentPosition && (
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{
                      left: `${latLngToPixel(currentPosition.latitude, currentPosition.longitude).x}%`,
                      top: `${latLngToPixel(currentPosition.latitude, currentPosition.longitude).y}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded px-2 py-1 shadow-sm">
                        <span className="text-xs font-medium text-gray-800 whitespace-nowrap">
                          {selectedVessel.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Progress bar */}
              <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-gray-600 min-w-0">
                    {currentIndex + 1} / {trackingData.length}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentIndex + 1) / trackingData.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">
                    {currentPosition?.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="mr-2" size={20} />
              Current Position
            </h3>
            
            {currentPosition && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Timestamp:</span>
                  <span className="font-medium">{currentPosition.timestamp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Latitude:</span>
                  <span className="font-medium">{currentPosition.latitude.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Longitude:</span>
                  <span className="font-medium">{currentPosition.longitude.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Speed:</span>
                  <span className="font-medium">{currentPosition.speed.toFixed(1)} kts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Heading:</span>
                  <span className="font-medium flex items-center">
                    <Navigation size={14} className="mr-1" />
                    {currentPosition.heading}°
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Trip Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="mr-2" size={20} />
              Trip Statistics
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Points:</span>
                <span className="font-medium">{trackingData.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">
                  {trackingData.length > 0 && (
                    Math.round((trackingData[trackingData.length - 1].timestamp.getTime() - trackingData[0].timestamp.getTime()) / (1000 * 60 * 60))
                  )} hours
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Speed:</span>
                <span className="font-medium">
                  {trackingData.length > 0 && (
                    (trackingData.reduce((sum, point) => sum + point.speed, 0) / trackingData.length).toFixed(1)
                  )} kts
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Speed:</span>
                <span className="font-medium">
                  {trackingData.length > 0 && Math.max(...trackingData.map(p => p.speed)).toFixed(1)} kts
                </span>
              </div>
            </div>
          </div>

          {/* Recent Waypoints */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Waypoints</h3>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {trackingData.slice(-10).reverse().map((point, index) => (
                <div 
                  key={point.id}
                  className={`p-2 rounded-lg text-sm ${
                    point.id === currentPosition?.id ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{point.timestamp.toLocaleTimeString()}</span>
                    <span className="text-gray-600">{point.speed.toFixed(1)} kts</span>
                  </div>
                  <div className="text-gray-500 text-xs">
                    {point.latitude.toFixed(4)}, {point.longitude.toFixed(4)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}