
import React from 'react';

interface HealthAppUIProps {
  parsedUI: any;
}

export const HealthAppUI: React.FC<HealthAppUIProps> = ({ parsedUI }) => {
  return (
    <div className="flex flex-col p-4">
      <div className="mb-6">
        <div className="text-lg font-semibold mb-1">Hello, User</div>
        <div className="text-sm text-gray-500 mb-3">Keep up the good work!</div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">Daily Steps</div>
              <div className="text-xl font-bold">7,248</div>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" 
              style={{ backgroundColor: `${parsedUI.primaryColor || '#4F46E5'}20` }}>
              <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5v14H5V5h14m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
            </div>
          </div>
          
          <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: '72%', backgroundColor: parsedUI.primaryColor || '#4F46E5' }}></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">72% of daily goal</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2" 
            style={{ backgroundColor: `${parsedUI.accentColor || '#34D399'}20` }}>
            <div className="h-4 w-4" style={{ backgroundColor: parsedUI.accentColor || '#34D399', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
          </div>
          <div className="text-sm text-gray-500">Heart Rate</div>
          <div className="text-xl font-bold">72 bpm</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2" 
            style={{ backgroundColor: `${parsedUI.primaryColor || '#4F46E5'}20` }}>
            <div className="h-4 w-4" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"></path><path d="M21 8h-3a2 2 0 0 1-2-2V3"></path><path d="M3 16h3a2 2 0 0 1 2 2v3"></path><path d="M16 21v-3a2 2 0 0 1 2-2h3"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
          </div>
          <div className="text-sm text-gray-500">Sleep</div>
          <div className="text-xl font-bold">7h 24m</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium">Today's Activities</div>
        </div>
        
        <div className="space-y-3">
          {[
            { name: 'Morning Run', time: '07:30 AM', duration: '32 min', calories: '286 kcal' },
            { name: 'Meditation', time: '09:15 AM', duration: '15 min', calories: '24 kcal' },
            { name: 'Yoga Session', time: '06:30 PM', duration: '45 min', calories: '189 kcal' }
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div>
                <div className="text-sm font-medium">{activity.name}</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{activity.duration}</div>
                <div className="text-xs text-gray-500">{activity.calories}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
