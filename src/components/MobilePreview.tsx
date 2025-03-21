
import React, { useState, useEffect } from 'react';
import CodeRenderer from './CodeRenderer';
import { Phone, Smartphone, Info, X, ChevronDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Available device models with their specs
const deviceModels = [
  {
    id: 'iphone-13',
    name: 'iPhone 13',
    width: 390,
    height: 844,
    platform: 'ios',
    year: 2021
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    width: 390,
    height: 844,
    platform: 'ios',
    year: 2022
  },
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    width: 393,
    height: 852,
    platform: 'ios',
    year: 2023
  },
  {
    id: 'pixel-6',
    name: 'Pixel 6',
    width: 412,
    height: 915,
    platform: 'android',
    year: 2021
  },
  {
    id: 'pixel-7',
    name: 'Pixel 7',
    width: 412,
    height: 915,
    platform: 'android',
    year: 2022
  },
  {
    id: 'samsung-s23',
    name: 'Samsung S23',
    width: 360,
    height: 780,
    platform: 'android',
    year: 2023
  }
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

interface MobilePreviewProps {
  previewCode?: string;
  qrCodeUrl?: string;
  detectedScreens?: string[];
}

const MobilePreview: React.FC<MobilePreviewProps> = ({ 
  previewCode, 
  qrCodeUrl,
  detectedScreens = [] 
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android'>('ios');
  const [selectedDeviceId, setSelectedDeviceId] = useState('iphone-15');
  const [showInfo, setShowInfo] = useState(true);
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);
  const [isCodeLoading, setIsCodeLoading] = useState(false);

  // Get the selected device
  const selectedDevice = deviceModels.find((d) => d.id === selectedDeviceId) || deviceModels[0];
  
  // Filter devices for the selected platform
  const platformDevices = deviceModels.filter((device) => device.platform === selectedPlatform);
  
  // Set a default device when platform changes
  useEffect(() => {
    const defaultDevice = platformDevices[0];
    if (defaultDevice) {
      setSelectedDeviceId(defaultDevice.id);
    }
  }, [selectedPlatform]);

  // Simulate loading state when previewCode changes
  useEffect(() => {
    if (previewCode) {
      setIsCodeLoading(true);
      // Simulate processing time to avoid flickering
      const timer = setTimeout(() => {
        setIsCodeLoading(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [previewCode]);

  return (
    <div className="flex flex-col h-full">
      {/* Top navigation tabs */}
      <div className="flex border-b border-white/10 bg-background">
        <div className="flex-1 flex">
          <button 
            onClick={() => setSelectedPlatform('ios')}
            className={`px-6 py-2 text-sm font-medium ${
              selectedPlatform === 'ios' ? 'bg-black text-white' : 'text-white/60 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            iOS
          </button>
          <button 
            onClick={() => setSelectedPlatform('android')}
            className={`px-6 py-2 text-sm font-medium ${
              selectedPlatform === 'android' ? 'bg-black text-white' : 'text-white/60 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            Android
          </button>
        </div>
      </div>

      {/* Device selector */}
      <div className="px-4 py-2 border-b border-white/10 bg-black">
        <Select value={selectedDeviceId} onValueChange={setSelectedDeviceId}>
          <SelectTrigger className="w-full bg-black/90 border-0 focus:ring-0 text-white h-8">
            <div className="flex items-center justify-between w-full">
              <span>{selectedDevice.name} ({selectedDevice.year})</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-black border border-white/10">
            {platformDevices.map((device) => (
              <SelectItem key={device.id} value={device.id} className="text-white hover:bg-white/10">
                {device.name} ({device.year})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 flex">
        {/* Phone preview area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          <div
            className="relative border-[12px] rounded-[40px] overflow-hidden shadow-2xl transition-all"
            style={{
              borderColor: '#000',
              width: `${selectedDevice.width * 0.25}px`,
              height: `${selectedDevice.height * 0.25}px`,
              maxHeight: '90%'
            }}
          >
            {/* Notch for iOS devices */}
            {selectedPlatform === 'ios' && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[70px] h-[18px] bg-black rounded-b-xl z-10" />
            )}
            
            <div className="w-full h-full overflow-hidden bg-black">
              {isCodeLoading ? (
                <div className="flex flex-col items-center justify-center h-full bg-black p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <p className="mt-3 text-xs text-white/70">Loading preview...</p>
                </div>
              ) : previewCode ? (
                <CodeRenderer code={previewCode} platform={selectedPlatform} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-black p-4">
                  <p className="text-xs text-white/70 text-center">Generate an app to see the preview</p>
                </div>
              )}
            </div>
            
            {/* Home indicator for modern iOS devices */}
            {selectedPlatform === 'ios' && selectedDevice.year >= 2022 && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[60px] h-[4px] bg-white/30 rounded-full" />
            )}
            
            {/* Android navigation buttons */}
            {selectedPlatform === 'android' && (
              <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-6 py-1">
                <div className="w-4 h-4 border-2 border-white/30 rounded-sm" />
                <div className="w-4 h-4 border-2 border-white/30 rounded-full" />
                <div className="w-4 h-4 border-2 border-white/30 transform rotate-45" />
              </div>
            )}
          </div>
        </div>
        
        {/* Right panel with device info and screens */}
        <div className="w-[320px] border-l border-white/10 flex flex-col">
          {/* Device Info Panel */}
          <div className="p-4 bg-black/70">
            <h3 className="text-sm font-medium mb-3 text-white">Device Info</h3>
            <div className="grid grid-cols-2 gap-y-2">
              <div>
                <p className="text-xs text-white/60">Model</p>
                <p className="text-sm text-white">{selectedDevice.name}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Resolution</p>
                <p className="text-sm text-white">{selectedDevice.width}×{selectedDevice.height}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Year</p>
                <p className="text-sm text-white">{selectedDevice.year}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Platform</p>
                <p className="text-sm text-white">{selectedPlatform === 'ios' ? 'iOS' : 'Android'}</p>
              </div>
            </div>
          </div>
          
          {/* Only display screens section if there are detected screens */}
          {detectedScreens && detectedScreens.length > 0 && (
            <div className="p-4 border-t border-white/10">
              <h3 className="text-sm font-medium mb-3 text-white">Screens</h3>
              <div className="flex flex-wrap gap-2">
                {detectedScreens.map((screen, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedScreen(screen)}
                    className={`px-3 py-1.5 text-xs rounded-full ${
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
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
