
import React, { useState, useEffect } from 'react';
import CodeRenderer from './CodeRenderer';
import { Smartphone, Phone, Info, X } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface MobilePreviewProps {
  previewCode?: string;
  qrCodeUrl?: string;
}

// Available device models with their specs
const deviceModels = [
  { id: 'iphone-13', name: 'iPhone 13', width: 390, height: 844, platform: 'ios', year: 2021 },
  { id: 'iphone-14', name: 'iPhone 14', width: 390, height: 844, platform: 'ios', year: 2022 },
  { id: 'iphone-15', name: 'iPhone 15', width: 393, height: 852, platform: 'ios', year: 2023 },
  { id: 'pixel-6', name: 'Pixel 6', width: 412, height: 915, platform: 'android', year: 2021 },
  { id: 'pixel-7', name: 'Pixel 7', width: 412, height: 915, platform: 'android', year: 2022 },
  { id: 'samsung-s23', name: 'Samsung S23', width: 360, height: 780, platform: 'android', year: 2023 },
];

// Function to get feature description
const getFeatureDescription = (feature: string): string => {
  const featureDescriptions: Record<string, string> = {
    'User Authentication': 'Secure login and registration system',
    'Social Feed': 'View posts from other users',
    'Post Creation': 'Create and share posts with photos',
    'User Profiles': 'Customizable user profiles',
    'Commenting': 'Comment on posts',
    'Likes': 'Like posts from other users',
    'Search': 'Find users and content',
    'Notifications': 'Get alerts for new activity',
    'Direct Messaging': 'Chat with other users',
    'Photo/Video Posting': 'Share photos and videos',
    'Like and Comment': 'Engage with content',
    'User Feed': 'View personalized content',
    'Profile Page': 'View and edit your profile',
    'Explore Page': 'Discover new content',
    'Camera Integration': 'Take photos directly in the app',
    'Location Services': 'Tag content with location data',
    'Story Features': 'Share temporary content',
    'Bookmarks': 'Save content for later'
  };

  return featureDescriptions[feature] || 'Feature not found';
};

const MobilePreview: React.FC<MobilePreviewProps> = ({ previewCode, qrCodeUrl }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android'>('ios');
  const [selectedDeviceId, setSelectedDeviceId] = useState('iphone-15');
  const [showInfo, setShowInfo] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  
  // Get the selected device
  const selectedDevice = deviceModels.find(d => d.id === selectedDeviceId) || deviceModels[0];
  
  // Filter devices for the selected platform
  const platformDevices = deviceModels.filter(device => device.platform === selectedPlatform);
  
  // Set a default device when platform changes
  useEffect(() => {
    const defaultDevice = platformDevices[0];
    if (defaultDevice) {
      setSelectedDeviceId(defaultDevice.id);
    }
  }, [selectedPlatform]);

  // Extract screens from the preview code
  const extractScreens = (code?: string) => {
    if (!code) return [];
    
    const screenMatches = code.match(/Screen|View|Page|Component/g);
    if (!screenMatches) return [];
    
    // Try to extract screen names
    const screenNameRegex = /(const|function)\s+([A-Z][a-zA-Z0-9]*(?:Screen|View|Page))/g;
    const screens: string[] = [];
    let match;
    
    while ((match = screenNameRegex.exec(code)) !== null) {
      if (match[2] && !screens.includes(match[2])) {
        screens.push(match[2]);
      }
    }
    
    // If we couldn't find any named screens, use default screens
    if (screens.length === 0) {
      return ['Home Screen', 'Profile Screen', 'Search Screen', 'Login Screen', 'Detail Screen'];
    }
    
    return screens;
  };
  
  const screens = extractScreens(previewCode);

  return (
    <div className="flex flex-col h-full p-4">
      {/* Device selection header */}
      <div className="flex justify-between items-center mb-4">
        {/* Platform toggle */}
        <div className="flex items-center bg-white/5 rounded-lg p-0.5">
          <button
            onClick={() => setSelectedPlatform('ios')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
              selectedPlatform === 'ios' ? 'bg-white/10 text-white' : 'text-white/60'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>iOS</span>
          </button>
          <button
            onClick={() => setSelectedPlatform('android')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
              selectedPlatform === 'android' ? 'bg-white/10 text-white' : 'text-white/60'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android</span>
          </button>
        </div>
        
        {/* Device selector and info */}
        <div className="flex items-center gap-2">
          <Select
            value={selectedDeviceId}
            onValueChange={setSelectedDeviceId}
          >
            <SelectTrigger className="w-[180px] h-9 bg-white/5 border-white/10 text-sm">
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              {platformDevices.map(device => (
                <SelectItem key={device.id} value={device.id}>
                  {device.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => setShowInfo(!showInfo)}
                  className="p-1.5 rounded-md hover:bg-white/5 text-white/70"
                >
                  <Info className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Device information</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Device info panel */}
      {showInfo && (
        <div className="bg-white/5 rounded-lg p-3 mb-4 text-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Device Info</h3>
            <button 
              onClick={() => setShowInfo(false)}
              className="p-1 hover:bg-white/10 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-white/60">Model</p>
              <p>{selectedDevice.name}</p>
            </div>
            <div>
              <p className="text-white/60">Resolution</p>
              <p>{selectedDevice.width}×{selectedDevice.height}</p>
            </div>
            <div>
              <p className="text-white/60">Year</p>
              <p>{selectedDevice.year}</p>
            </div>
            <div>
              <p className="text-white/60">Platform</p>
              <p>{selectedDevice.platform === 'ios' ? 'iOS' : 'Android'}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Screen selector */}
      {screens.length > 0 && (
        <div className="mb-4 overflow-auto">
          <h3 className="text-sm font-medium mb-2 text-white/80">Screens</h3>
          <div className="flex gap-2 flex-wrap">
            {screens.map((screen, index) => (
              <button
                key={index}
                onClick={() => setSelectedScreen(screen)}
                className={`px-3 py-1.5 text-sm rounded-full ${
                  selectedScreen === screen
                    ? 'bg-white/10 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {screen.replace(/Screen|View|Page/g, '')}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Phone device frame */}
      <div className="flex-1 flex items-center justify-center">
        <div 
          className={`relative border-8 ${
            selectedPlatform === 'ios' ? 'rounded-[40px] border-gray-800' : 'rounded-[28px] border-gray-700'
          } overflow-hidden transition-all shadow-xl`}
          style={{
            width: `${selectedDevice.width * 0.22}px`,
            height: `${selectedDevice.height * 0.22}px`,
            maxHeight: '90%',
          }}
        >
          {/* Notch for iOS devices */}
          {selectedPlatform === 'ios' && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[70px] h-[18px] bg-black rounded-b-xl z-10"></div>
          )}
          
          {/* Phone content */}
          <div className="w-full h-full overflow-hidden bg-gray-100">
            {previewCode ? (
              <CodeRenderer code={previewCode} platform={selectedPlatform} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
                <div className="animate-pulse flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Home indicator for modern iOS devices */}
          {selectedPlatform === 'ios' && selectedDevice.year >= 2022 && (
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-[60px] h-[4px] bg-gray-800 rounded-full"></div>
          )}
          
          {/* Android navigation buttons */}
          {selectedPlatform === 'android' && (
            <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-6 py-1">
              <div className="w-4 h-4 border-2 border-gray-700 rounded-sm"></div>
              <div className="w-4 h-4 border-2 border-gray-700 rounded-full"></div>
              <div className="w-4 h-4 border-2 border-gray-700 transform rotate-45"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* QR Code section (hidden for now) */}
      {false && qrCodeUrl && (
        <div className="mt-4 p-4 bg-white/5 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Test on your device</h3>
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-md">
              {/* QR Code image would go here */}
              <div className="w-24 h-24 bg-white"></div>
            </div>
            <div>
              <p className="text-sm text-white/80 mb-1">Scan with your phone camera</p>
              <p className="text-xs text-white/60">or <a href={qrCodeUrl} className="underline">open this link</a></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilePreview;
