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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
      <div className="flex flex-col items-center">
        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-4 text-center">Power Source & Alarm</h3>
        
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 mb-2 sm:mb-4">
          <img 
            src="/power source & alarm.jpeg" 
            alt="Power Source & Alarm"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          
          {/* Status overlays */}
          <div className="absolute inset-0 flex flex-col justify-center items-center space-y-2">
            {/* AC Power Status */}
            <div className={`w-12 h-8 sm:w-16 sm:h-10 rounded ${acPower ? 'bg-green-500' : 'bg-gray-400'} opacity-80 flex items-center justify-center`}>
              <span className="text-white text-xs sm:text-xs font-bold">AC</span>
            </div>
            
            {/* DC Power Status */}
            <div className={`w-12 h-8 sm:w-16 sm:h-10 rounded ${dcPower ? 'bg-green-500' : 'bg-gray-400'} opacity-80 flex items-center justify-center`}>
              <span className="text-white text-xs sm:text-xs font-bold">DC</span>
            </div>
            
            {/* Backup Battery Status */}
            <div className={`w-16 h-8 sm:w-20 sm:h-10 rounded ${backupBattery ? 'bg-green-500' : 'bg-gray-400'} opacity-80 flex items-center justify-center`}>
              <span className="text-white text-xs sm:text-xs font-bold">BACKUP</span>
            </div>
            
            {/* Alarm and Blackout indicators */}
            <div className="flex space-x-4 mt-2">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${alarm ? 'bg-yellow-500' : 'bg-gray-300'} opacity-90`}></div>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full ${blackout ? 'bg-red-500' : 'bg-gray-300'} opacity-90`}></div>
            </div>
          </div>
        </div>
        
        {/* Status labels */}
        <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs text-center w-full">
          <div className={`p-2 rounded ${acPower ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            AC Power
          </div>
          <div className={`p-2 rounded ${dcPower ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            DC Power
          </div>
          <div className={`p-2 rounded ${backupBattery ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            Backup Battery
          </div>
          <div className={`p-2 rounded ${alarm ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
            {alarm ? 'Alarm Active' : 'No Alarm'}
          </div>
        </div>
        
        {blackout && (
          <div className="mt-1 sm:mt-2 px-2 sm:px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
            Blackout Detected
          </div>
        )}
      </div>
    </div>
  );
}