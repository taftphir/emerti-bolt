import React from 'react';

interface AnalogGaugeProps {
  value: number;
  min: number;
  max: number;
  unit: string;
  label: string;
  color?: 'blue' | 'green' | 'orange' | 'red';
  warningThreshold?: number;
  criticalThreshold?: number;
}

export default function AnalogGauge({
  value,
  min,
  max,
  unit,
  label,
  color = 'blue',
  warningThreshold,
  criticalThreshold
}: AnalogGaugeProps) {
  // For RPM gauges, calculate needle position based on value/1000 for 0-5 scale
  const isRPMGauge = label.toLowerCase().includes('rpm') || label.toLowerCase().includes('engine');
  const displayValue = isRPMGauge ? value / 1000 : value;
  const gaugeMax = isRPMGauge ? 5 : max; // RPM gauges have 0-5 scale (x1000)
  const gaugeMin = isRPMGauge ? 0 : min;
  
  const percentage = Math.max(0, Math.min(100, ((displayValue - gaugeMin) / (gaugeMax - gaugeMin)) * 100));
  
  // Calculate needle rotation angle (gauge shows 270 degrees, from -135 to +135)
  const needleAngle = -135 + (percentage / 100) * 270;

  const getGaugeImage = () => {
    if (label.toLowerCase().includes('rpm') || label.toLowerCase().includes('engine')) {
      return '/engine rpm.jpeg';
    }
    if (label.toLowerCase().includes('fuel')) {
      return '/engine fuel.jpeg';
    }
    if (label.toLowerCase().includes('heading')) {
      return '/gps heading.jpeg';
    }
    // Default to RPM gauge for speed and other measurements
    return '/engine rpm.jpeg';
  };

  const getStatusColor = () => {
    if (criticalThreshold && (value < criticalThreshold || value > max * 0.9)) {
      return 'text-red-600 bg-red-100';
    }
    if (warningThreshold && (value < warningThreshold || value > max * 0.8)) {
      return 'text-yellow-600 bg-yellow-100';
    }
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
      <div className="flex flex-col items-center">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-4 text-center">{label}</h3>
        
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 mb-2 sm:mb-4">
          <img 
            src={getGaugeImage()} 
            alt={label}
            className="w-full h-full object-cover rounded-full shadow-lg relative"
          />
          
          {/* Needle overlay for RPM gauges */}
          {isRPMGauge && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-1 bg-red-600 origin-bottom absolute"
                style={{
                  height: '35%',
                  transform: `rotate(${needleAngle}deg)`,
                  transformOrigin: 'bottom center',
                  bottom: '50%'
                }}
              />
              {/* Center dot */}
              <div className="w-3 h-3 bg-gray-300 rounded-full border-2 border-gray-600 absolute"></div>
            </div>
          )}
          
          {/* RPM value display in running hours box */}
          {isRPMGauge && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs font-mono border border-gray-600">
                {Math.round(value).toString().padStart(6, '0')}
              </div>
            </div>
          )}
          
          {/* Standard overlay for non-RPM gauges */}
          {!isRPMGauge && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-black bg-opacity-70 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-lg mt-12 sm:mt-20">
                <div className="text-center">
                  <span className="text-lg sm:text-2xl font-bold">
                    {value.toFixed(1)}
                  </span>
                  <div className="text-xs sm:text-xs opacity-80">{unit}</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Heading gauge special display */}
          {label.toLowerCase().includes('heading') && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-gray-800 text-green-400 px-2 py-1 rounded text-xs font-mono border border-gray-600">
                {Math.round(value).toString().padStart(3, '0')}°
              </div>
            </div>
          )}
        </div>
        
        {/* Scale labels for RPM gauges */}
        {isRPMGauge ? (
          <div className="flex justify-between w-full text-xs text-gray-500 mb-1 sm:mb-2">
            <span>0</span>
            <span>5</span>
          </div>
        ) : (
          <div className="flex justify-between w-full text-xs text-gray-500 mb-1 sm:mb-2">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        )}
        
        {/* Status indicator */}
        <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {isRPMGauge ? (
            displayValue > 4.5 ? 'High RPM' : 
            displayValue > 3.5 ? 'Normal' : 
            displayValue < 0.5 ? 'Low RPM' : 'Normal'
          ) : (
            percentage > 95 ? 'Critical' : 
            percentage > 80 ? 'High' : 
            percentage < 20 ? 'Low' : 'Normal'
          )}
        </div>
        
        {/* RPM unit display */}
        {isRPMGauge && (
          <div className="text-xs text-gray-500 mt-1 text-center">
            x1000 RPM
          </div>
        )}
      </div>
    </div>
  );
}