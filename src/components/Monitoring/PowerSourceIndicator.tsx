import React from 'react';

interface PowerSourceIndicatorProps {
  acPower: boolean;
  dcPower: boolean;
  backupBattery: boolean;
  alarm: boolean;
  blackout: boolean;
}

export default function PowerSourceIndicator({
  acPower = true,
  dcPower = true,
  backupBattery = true,
  alarm = false,
  blackout = false
}: PowerSourceIndicatorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex flex-col items-center">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4 text-center">Power Source & Alarm</h3>
        
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 mb-3 sm:mb-4">
          <img 
            src="/power source & alarm.jpeg" 
            alt="Power Source & Alarm"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          
          {/* Status overlays */}
          <div className="absolute inset-0 flex flex-col justify-center items-center space-y-2">
            {/* AC Power Status */}
            <div className={`w-16 h-10 sm:w-20 sm:h-12 rounded ${acPower ? 'bg-green-500' : 'bg-gray-400'} opacity-90 flex items-center justify-center shadow-lg`}>
              <span className="text-white text-sm sm:text-base font-bold">AC</span>
            </div>
            
            {/* DC Power Status */}
            <div className={`w-16 h-10 sm:w-20 sm:h-12 rounded ${dcPower ? 'bg-green-500' : 'bg-gray-400'} opacity-90 flex items-center justify-center shadow-lg`}>
              <span className="text-white text-sm sm:text-base font-bold">DC</span>
            </div>
            
            {/* Backup Battery Status */}
            <div className={`w-20 h-10 sm:w-24 sm:h-12 rounded ${backupBattery ? 'bg-green-500' : 'bg-gray-400'} opacity-90 flex items-center justify-center shadow-lg`}>
              <span className="text-white text-sm sm:text-base font-bold">BACKUP</span>
            </div>
            
            {/* Alarm and Blackout indicators */}
            <div className="flex space-x-6 mt-3">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${alarm ? 'bg-yellow-500' : 'bg-gray-300'} opacity-90 shadow-lg`}></div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${blackout ? 'bg-red-500' : 'bg-gray-300'} opacity-90 shadow-lg`}></div>
            </div>
          </div>
        </div>
        
        {/* Status labels */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-sm text-center w-full">
          <div className={`p-3 rounded-lg ${acPower ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'} font-medium`}>
            AC Power
          </div>
          <div className={`p-3 rounded-lg ${dcPower ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'} font-medium`}>
            DC Power
          </div>
          <div className={`p-3 rounded-lg ${backupBattery ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'} font-medium`}>
            Backup Battery
          </div>
          <div className={`p-3 rounded-lg ${alarm ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'} font-medium`}>
            {alarm ? 'Alarm Active' : 'No Alarm'}
          </div>
        </div>
        
        {blackout && (
          <div className="mt-2 sm:mt-3 px-3 sm:px-4 py-2 bg-red-100 text-red-800 text-sm rounded-full font-semibold shadow-sm">
            Blackout Detected
          </div>
        )}
      </div>
    </div>
  );
}