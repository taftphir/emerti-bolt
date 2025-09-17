import React, { useState } from 'react';
import { MapPin, Navigation, Zap, Clock } from 'lucide-react';
import { mockVessels } from '../../data/mockData';
import { Vessel } from '../../types/vessel';

export default function VesselMap() {
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [mapCenter] = useState({ lat: -6.2088, lng: 106.8456 });

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
        <p className="text-sm sm:text-base text-gray-600">Real-time fleet positioning and tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-64 sm:h-80 lg:h-96 bg-blue-50 relative">
              {/* Simplified map visualization */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white rounded-lg shadow-sm p-1 sm:p-2">
                  <p className="text-xs text-gray-600">Jakarta Bay</p>
                </div>
                
                {mockVessels.map((vessel) => {
                  const x = ((vessel.position.lng - 106.8000) / 0.1) * 100;
                  const y = ((vessel.position.lat + 6.1500) / 0.1) * 100;
                  
                  return (
                    <div
                      key={vessel.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                        selectedVessel?.id === vessel.id ? 'z-20' : 'z-10'
                      }`}
                      style={{
                        left: `${Math.max(10, Math.min(90, x))}%`,
                        top: `${Math.max(10, Math.min(90, y))}%`,
                      }}
                      onClick={() => setSelectedVessel(vessel)}
                    >
                      <div className={`relative p-2 rounded-full ${getStatusBg(vessel.status)} border-2 transition-transform hover:scale-110 ${
                        selectedVessel?.id === vessel.id ? 'scale-125' : ''
                      }`}>
                        <Navigation 
                          size={12} 
                          className={`sm:w-4 sm:h-4 ${getStatusColor(vessel.status)}`}
                          style={{ transform: `rotate(${vessel.heading}deg)` }}
                        />
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
              
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white rounded-lg shadow-sm p-1 sm:p-2">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}