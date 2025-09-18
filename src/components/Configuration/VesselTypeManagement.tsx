import React, { useState } from 'react';
import { Layers, Plus, Edit, Trash2 } from 'lucide-react';

interface VesselType {
  id: string;
  name: string;
  description: string;
  maxSpeed: number;
  fuelCapacity: number;
  engineCount: number;
  color: string;
}

const mockVesselTypes: VesselType[] = [
  {
    id: '1',
    name: 'Cargo',
    description: 'General cargo vessels',
    maxSpeed: 20,
    fuelCapacity: 5000,
    engineCount: 2,
    color: '#3b82f6'
  },
  {
    id: '2',
    name: 'Tanker',
    description: 'Oil and liquid cargo tankers',
    maxSpeed: 15,
    fuelCapacity: 8000,
    engineCount: 2,
    color: '#ef4444'
  },
  {
    id: '3',
    name: 'Container',
    description: 'Container cargo ships',
    maxSpeed: 25,
    fuelCapacity: 6000,
    engineCount: 3,
    color: '#10b981'
  },
  {
    id: '4',
    name: 'Ferry',
    description: 'Passenger and vehicle ferries',
    maxSpeed: 18,
    fuelCapacity: 3000,
    engineCount: 2,
    color: '#f59e0b'
  }
];

export default function VesselTypeManagement() {
  const [vesselTypes] = useState<VesselType[]>(mockVesselTypes);

  return (
    <div>
      <div className="flex items-center justify-end mb-6">
        <button className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          <Plus size={16} />
          <span className="hidden sm:inline">Add Type</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {vesselTypes.map((type) => (
          <div key={type.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div 
              className="h-24 sm:h-32 flex items-center justify-center"
              style={{ backgroundColor: `${type.color}20` }}
            >
              <Layers 
                size={32}
                className="sm:w-12 sm:h-12"
                style={{ color: type.color }}
              />
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">{type.name}</h3>
                <div className="flex space-x-1 sm:space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mb-4">{type.description}</p>
              
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Speed:</span>
                  <span className="font-medium">{type.maxSpeed} kts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fuel Capacity:</span>
                  <span className="font-medium">{type.fuelCapacity.toLocaleString()} L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Engine Count:</span>
                  <span className="font-medium">{type.engineCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}