import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, BarChart3 } from 'lucide-react';
import { mockVessels, generateHourlyData } from '../../data/mockData';
import { Vessel } from '../../types/vessel';

export default function DailyReport() {
  const [selectedVessel, setSelectedVessel] = useState<Vessel>(mockVessels[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const data = generateHourlyData(selectedVessel);

  const chartConfigs = [
    {
      id: 'speed',
      label: 'Speed (knots)',
      data: data.speedData,
      color: 'rgb(59, 130, 246)',
      bgColor: 'rgba(59, 130, 246, 0.1)',
      unit: 'kts'
    },
    {
      id: 'rpm',
      label: 'RPM',
      data: data.rpmData,
      color: 'rgb(249, 115, 22)',
      bgColor: 'rgba(249, 115, 22, 0.1)',
      unit: 'RPM'
    },
    {
      id: 'fuel',
      label: 'Fuel Consumption (L/h)',
      data: data.fuelData,
      color: 'rgb(220, 38, 38)',
      bgColor: 'rgba(220, 38, 38, 0.1)',
      unit: 'L/h'
    }
  ];

  const getStats = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const avg = data.reduce((a, b) => a + b, 0) / data.length;
    const variation = max - min;
    return { max, min, avg, variation };
  };

  const renderChart = (config: typeof chartConfigs[0]) => {
    const stats = getStats(config.data);
    const maxValue = stats.max;
    const minValue = stats.min;

    return (
      <div key={config.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            {config.label} - {selectedVessel.name}
          </h3>
          <div className="flex items-center space-x-4 text-xs sm:text-sm">
            <div className="text-center">
              <div className="text-gray-600">Avg</div>
              <div className="font-semibold" style={{ color: config.color }}>
                {stats.avg.toFixed(1)} {config.unit}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">Max</div>
              <div className="font-semibold text-green-600">
                {stats.max.toFixed(1)} {config.unit}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">Min</div>
              <div className="font-semibold text-orange-600">
                {stats.min.toFixed(1)} {config.unit}
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-48 sm:h-64 relative overflow-x-auto">
          <svg className="w-full h-full min-w-96" viewBox="0 0 800 240">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="60"
                y1={40 + i * 40}
                x2="760"
                y2={40 + i * 40}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            ))}
            
            {/* Y-axis labels */}
            {[0, 1, 2, 3, 4].map((i) => (
              <text
                key={i}
                x="50"
                y={48 + i * 40}
                textAnchor="end"
                className="text-xs fill-gray-600"
              >
                {(maxValue - (i * (maxValue - minValue) / 4)).toFixed(0)}
              </text>
            ))}
            
            {/* Chart area background */}
            <rect
              x="60"
              y="40"
              width="700"
              height="160"
              fill={config.bgColor}
              rx="4"
            />
            
            {/* Chart line */}
            <polyline
              points={config.data
                .map((value, index) => {
                  const x = 60 + (index * 700) / (config.data.length - 1);
                  const y = 40 + (160 * (maxValue - value)) / (maxValue - minValue);
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke={config.color}
              strokeWidth="3"
              className="drop-shadow-sm"
            />
            
            {/* Data points */}
            {config.data.map((value, index) => {
              const x = 60 + (index * 700) / (config.data.length - 1);
              const y = 40 + (160 * (maxValue - value)) / (maxValue - minValue);
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={config.color}
                  className="hover:r-6 transition-all cursor-pointer drop-shadow-sm"
                >
                  <title>{`${data.hours[index]}: ${value.toFixed(1)} ${config.unit}`}</title>
                </circle>
              );
            })}
            
            {/* X-axis labels */}
            {data.hours.filter((_, i) => i % 4 === 0).map((hour, i) => (
              <text
                key={i}
                x={60 + (i * 4 * 700) / (data.hours.length - 1)}
                y="220"
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {hour}
              </text>
            ))}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full sm:w-auto">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Select Vessel
            </label>
            <select
              value={selectedVessel.id}
              onChange={(e) => {
                const vessel = mockVessels.find(v => v.id === e.target.value);
                if (vessel) setSelectedVessel(vessel);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {mockVessels.map((vessel) => (
                <option key={vessel.id} value={vessel.id}>
                  {vessel.name} ({vessel.type})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <Calendar size={16} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-end">
            <button className="w-full px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-1 sm:space-x-2 text-sm">
              <BarChart3 size={16} />
              <span className="hidden sm:inline">Generate Report</span>
              <span className="sm:hidden">Generate</span>
            </button>
          </div>
          
          <div className="flex items-end">
            <button className="w-full px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-1 sm:space-x-2 text-sm">
              <Download size={16} />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>

        {/* <button className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          <Download size={16} />
          <span className="hidden sm:inline">Export PDF</span>
          <span className="sm:hidden">Export</span>
        </button> */}
      </div>

      {/* Summary Stats */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
        {chartConfigs.map((config) => {
          const stats = getStats(config.data);
          return (
            <div key={config.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600">{config.label}</h3>
                <TrendingUp className="text-blue-500" size={16} />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Avg:</span>
                  <span className="font-medium" style={{ color: config.color }}>
                    {stats.avg.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Max:</span>
                  <span className="font-medium text-green-600">
                    {stats.max.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Min:</span>
                  <span className="font-medium text-orange-600">
                    {stats.min.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Range:</span>
                  <span className="font-medium text-purple-600">
                    {stats.variation.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}

      {/* All Charts in One Page */}
      <div className="space-y-6">
        {chartConfigs.map(renderChart)}
      </div>

      {/* Comparison Summary */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
          Performance Summary - {selectedVessel.name}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {chartConfigs.map((config) => {
            const stats = getStats(config.data);
            const performance = stats.avg > (stats.max * 0.7) ? 'High' : 
                              stats.avg > (stats.max * 0.4) ? 'Medium' : 'Low';
            const performanceColor = performance === 'High' ? 'text-green-600' : 
                                   performance === 'Medium' ? 'text-yellow-600' : 'text-red-600';
            
            return (
              <div key={config.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">{config.label}</h4>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Performance:</span>
                    <span className={`font-medium ${performanceColor}`}>{performance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Efficiency:</span>
                    <span className="font-medium">
                      {((1 - (stats.variation / stats.max)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stability:</span>
                    <span className="font-medium">
                      {stats.variation < (stats.max * 0.2) ? 'Stable' : 
                       stats.variation < (stats.max * 0.5) ? 'Moderate' : 'Variable'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}