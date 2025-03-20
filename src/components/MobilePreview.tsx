
import React, { useState, useEffect } from 'react';
import { Check, Smartphone, ExternalLink, Code, LayoutGrid } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import QRCode from 'qrcode';
import CodeRenderer from './CodeRenderer';
import { generateDemoFeatures } from '@/services/CodeParserService';

interface MobilePreviewProps {
  qrCodeUrl?: string;
  previewCode?: string;
}

type PhoneModel = {
  id: string;
  name: string;
  width: number;
  height: number;
  scaleFactor: number;
  releaseYear: number;
};

// Updated with accurate screen dimensions from Apple's official specifications
const iPhoneModels: PhoneModel[] = [
  { id: 'iphone-x', name: 'iPhone X', width: 375, height: 812, scaleFactor: 0.85, releaseYear: 2017 },
  { id: 'iphone-11', name: 'iPhone 11', width: 414, height: 896, scaleFactor: 0.8, releaseYear: 2019 },
  { id: 'iphone-12', name: 'iPhone 12', width: 390, height: 844, scaleFactor: 0.85, releaseYear: 2020 },
  { id: 'iphone-13', name: 'iPhone 13', width: 390, height: 844, scaleFactor: 0.85, releaseYear: 2021 },
  { id: 'iphone-14', name: 'iPhone 14', width: 390, height: 844, scaleFactor: 0.85, releaseYear: 2022 },
  { id: 'iphone-15', name: 'iPhone 15', width: 393, height: 852, scaleFactor: 0.85, releaseYear: 2023 },
];

const pixelModels: PhoneModel[] = [
  { id: 'pixel-4', name: 'Pixel 4', width: 393, height: 830, scaleFactor: 0.85, releaseYear: 2019 },
  { id: 'pixel-5', name: 'Pixel 5', width: 393, height: 851, scaleFactor: 0.85, releaseYear: 2020 },
  { id: 'pixel-6', name: 'Pixel 6', width: 393, height: 851, scaleFactor: 0.85, releaseYear: 2021 },
  { id: 'pixel-7', name: 'Pixel 7', width: 411, height: 914, scaleFactor: 0.8, releaseYear: 2022 },
  { id: 'pixel-8', name: 'Pixel 8', width: 411, height: 914, scaleFactor: 0.8, releaseYear: 2023 },
];

const MobilePreview: React.FC<MobilePreviewProps> = ({ qrCodeUrl, previewCode }) => {
  const [selectedOS, setSelectedOS] = useState('ios');
  const [selectedPhoneModel, setSelectedPhoneModel] = useState<string>(
    selectedOS === 'ios' ? iPhoneModels[5].id : pixelModels[4].id
  );
  const [qrCodeImage, setQRCodeImage] = useState<string>('');
  const [currentScreen, setCurrentScreen] = useState<string>('Home Screen');
  
  // Generate QR code when URL changes
  useEffect(() => {
    if (qrCodeUrl) {
      QRCode.toDataURL(qrCodeUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
      .then(url => {
        setQRCodeImage(url);
      })
      .catch(err => {
        console.error('Error generating QR code:', err);
      });
    }
  }, [qrCodeUrl]);
  
  const phoneModels = selectedOS === 'ios' ? iPhoneModels : pixelModels;
  const currentPhone = phoneModels.find(phone => phone.id === selectedPhoneModel) || 
    (selectedOS === 'ios' ? iPhoneModels[5] : pixelModels[4]);
  
  const handleOSChange = (newOS: string) => {
    setSelectedOS(newOS);
    // Reset to the latest model of the selected OS
    setSelectedPhoneModel(newOS === 'ios' ? iPhoneModels[5].id : pixelModels[4].id);
  };

  // Get bezel color based on phone model
  const getBezelColor = () => {
    if (selectedOS === 'ios') {
      // iPhone models with different bezel colors
      if (currentPhone.id === 'iphone-15') {
        return 'bg-gradient-to-b from-gray-300 to-gray-400'; // Titanium finish for iPhone 15
      } else if (['iphone-14', 'iphone-13', 'iphone-12'].includes(currentPhone.id)) {
        return 'bg-gradient-to-b from-gray-400 to-gray-500'; // Aluminum finish for newer iPhones
      } else {
        return 'bg-gradient-to-b from-gray-500 to-gray-600'; // Stainless steel for older models
      }
    } else {
      // Pixel models with different bezel colors
      if (['pixel-8', 'pixel-7'].includes(currentPhone.id)) {
        return 'bg-gradient-to-b from-gray-300 to-gray-400'; // Polished aluminum for newer Pixels
      } else {
        return 'bg-gradient-to-b from-gray-600 to-gray-700'; // Matte finish for older Pixels
      }
    }
  };

  // Generate demo screens based on app details in code
  const generateScreenNames = () => {
    if (previewCode && previewCode.includes('pomodoro')) {
      return [
        'Onboarding Screen', 'Login Screen', 'Sign Up Screen', 'Home Screen', 
        'Task List Screen', 'Statistics Screen', 'Settings Screen', 'Profile Screen', 'Notification Screen'
      ];
    }
    
    if (previewCode && previewCode.includes('fitness')) {
      return [
        'Welcome Screen', 'Profile Setup', 'Dashboard', 'Workout Screen', 
        'Exercise List', 'Progress Screen', 'Meal Planner', 'Settings'
      ];
    }
    
    return [
      'Splash Screen', 'Login Screen', 'Home Screen', 'Detail Screen', 
      'Profile Screen', 'Settings Screen', 'Notification Screen'
    ];
  };

  // Extract app name from code
  const getAppNameFromCode = () => {
    if (!previewCode) return 'App Preview';
    
    try {
      const appNameMatch = previewCode.match(/const\s+([A-Za-z0-9_]+)App\s*=/i) || 
                           previewCode.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/i) ||
                           previewCode.match(/class\s+([A-Za-z0-9_]+)App/i);
      
      return appNameMatch ? appNameMatch[1] : previewCode.includes('pomodoro') ? 'PomoTimer' : 'AppPreview';
    } catch (e) {
      return 'App Preview';
    }
  };

  const demoFeatures = generateDemoFeatures(getAppNameFromCode());
  const screenNames = generateScreenNames();

  return (
    <div className="bg-background">
      {/* Tabs navigation */}
      <div className="border-b border-white/10 mb-4">
        <div className="flex space-x-2 px-4">
          <div className="border-b-2 border-primary py-2 px-4">
            <span className="text-sm font-medium text-white">Preview</span>
          </div>
          <div className="py-2 px-4">
            <span className="text-sm font-medium text-white/60">Code</span>
          </div>
        </div>
      </div>
      
      {/* Platform selector */}
      <div className="px-4 mb-4">
        <div className="flex space-x-2 p-1 bg-white/5 rounded-md">
          <button 
            className={`px-4 py-1.5 rounded-sm text-xs font-medium ${selectedOS === 'ios' ? 'bg-white/10' : 'text-white/60'}`}
            onClick={() => handleOSChange('ios')}
          >
            iOS
          </button>
          <button 
            className={`px-4 py-1.5 rounded-sm text-xs font-medium ${selectedOS === 'android' ? 'bg-white/10' : 'text-white/60'}`}
            onClick={() => handleOSChange('android')}
          >
            Android
          </button>
        </div>
      </div>

      <div className="flex flex-1 w-full">
        <div className="w-full flex flex-col">
          {/* Device selection */}
          <div className="px-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <Label className="text-xs text-white/70">Device Selection</Label>
              <Select
                value={selectedPhoneModel}
                onValueChange={setSelectedPhoneModel}
              >
                <SelectTrigger className="bg-white/5 border-0 text-sm">
                  <SelectValue placeholder="Select a device" />
                </SelectTrigger>
                <SelectContent>
                  {phoneModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name} ({model.releaseYear})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex md:flex-col lg:flex-row gap-6 px-4">
            {/* Phone preview */}
            <div className="flex-1 flex justify-center items-start">
              <div 
                className={`relative rounded-[40px] ${getBezelColor()} p-1 shadow-lg transform transition-all duration-300`}
                style={{
                  width: `${currentPhone.width * currentPhone.scaleFactor}px`,
                  height: `${currentPhone.height * currentPhone.scaleFactor}px`,
                  maxHeight: '100%'
                }}
              >
                {/* Dynamic notch for different iPhone models */}
                {selectedOS === 'ios' && (
                  <>
                    {/* Dynamic Island for iPhone 15 */}
                    {currentPhone.id === 'iphone-15' && (
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[90px] h-[25px] bg-black rounded-full z-50 flex items-center justify-center border border-white/70">
                        <div className="absolute right-[18px] w-[8px] h-[8px] rounded-full bg-black border border-gray-800 flex items-center justify-center">
                          <div className="w-[4px] h-[4px] rounded-full bg-gray-700"></div>
                        </div>
                        <div className="absolute left-[22px] w-[6px] h-[6px] rounded-full bg-gray-700"></div>
                      </div>
                    )}
                    {/* iPhone X through 14 notch - positioned inside the screen */}
                    {['iphone-x', 'iphone-11', 'iphone-12', 'iphone-13', 'iphone-14'].includes(currentPhone.id) && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-40 flex items-end justify-center pb-1 border border-white/70">
                        <div className="w-[6px] h-[6px] rounded-full bg-gray-700 mx-1"></div>
                        <div className="w-[8px] h-[8px] rounded-full bg-black border border-gray-800 mx-1 flex items-center justify-center">
                          <div className="w-[4px] h-[4px] rounded-full bg-gray-700"></div>
                        </div>
                        <div className="w-[6px] h-[6px] rounded-full bg-gray-700 mx-1"></div>
                      </div>
                    )}
                  </>
                )}
                
                {/* Camera cutouts for Android phones */}
                {selectedOS === 'android' && (
                  <>
                    {/* Punch hole for Pixel 7 and 8 */}
                    {['pixel-7', 'pixel-8'].includes(currentPhone.id) && (
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[12px] h-[12px] bg-black rounded-full z-50 border border-white/70 flex items-center justify-center">
                        <div className="w-[6px] h-[6px] rounded-full bg-gray-700"></div>
                      </div>
                    )}
                    {/* Punch hole for older Pixel models */}
                    {['pixel-4', 'pixel-5', 'pixel-6'].includes(currentPhone.id) && (
                      <div className="absolute top-0 right-[20%] w-[60px] h-[24px] bg-black z-50 flex items-center justify-center border border-white/70">
                        <div className="w-[8px] h-[8px] rounded-full bg-black border border-gray-800 flex items-center justify-center">
                          <div className="w-[4px] h-[4px] rounded-full bg-gray-700"></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                
                {/* Power and volume buttons for iOS */}
                {selectedOS === 'ios' && (
                  <>
                    {/* Power button */}
                    <div className="absolute top-[80px] right-[-4px] w-[4px] h-[30px] bg-gray-600 rounded-r-md" />
                    {/* Volume buttons */}
                    <div className="absolute top-[70px] left-[-4px] w-[4px] h-[25px] bg-gray-600 rounded-l-md" />
                    <div className="absolute top-[105px] left-[-4px] w-[4px] h-[25px] bg-gray-600 rounded-l-md" />
                  </>
                )}
                
                {/* Power and volume buttons for Android */}
                {selectedOS === 'android' && (
                  <>
                    {/* Power button */}
                    <div className="absolute top-[90px] right-[-4px] w-[4px] h-[40px] bg-gray-600 rounded-r-md" />
                    {/* Volume buttons */}
                    <div className="absolute top-[140px] right-[-4px] w-[4px] h-[50px] bg-gray-600 rounded-r-md" />
                  </>
                )}
                
                {/* Screen content */}
                <div className="w-full h-full bg-black rounded-[32px] overflow-hidden flex flex-col relative">
                  {/* Phone screen content area */}
                  {previewCode ? (
                    <div className="flex-1">
                      <CodeRenderer code={previewCode} platform={selectedOS as 'ios' | 'android'} />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center h-full">
                      {qrCodeImage ? (
                        <>
                          <img src={qrCodeImage} alt="QR Code" className="w-[150px] h-[150px] mb-4" />
                          <div className="text-[10px] text-white/70 mb-1">Scan with your phone camera</div>
                          <div className="flex items-center gap-1 text-[10px] text-white/50">
                            <ExternalLink size={10} />
                            <span>Open preview on your {selectedOS === 'ios' ? 'iPhone' : 'Android device'}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-[12px] text-white/50">
                          Generate an app to see the preview
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* QR code and information */}
            <div className="flex-1 flex flex-col">
              {/* Device info */}
              <div className="mb-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h3 className="text-sm font-medium text-white mb-2">Device Info</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                    <div>Model</div>
                    <div className="text-white">{currentPhone.name}</div>
                    <div>Resolution</div>
                    <div className="text-white">{currentPhone.width}×{currentPhone.height}</div>
                    <div>Year</div>
                    <div className="text-white">{currentPhone.releaseYear}</div>
                  </div>
                </div>
              </div>

              {/* Screen selection */}
              <div className="mb-4">
                <Label className="text-xs text-white/70 mb-2 block">Screens</Label>
                <div className="flex flex-wrap gap-2">
                  {screenNames.map((screenName) => (
                    <button
                      key={screenName}
                      className={`px-3 py-1.5 text-xs rounded-md ${
                        currentScreen === screenName 
                          ? 'bg-primary text-white' 
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                      onClick={() => setCurrentScreen(screenName)}
                    >
                      {screenName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Features section */}
              <div className="mt-4">
                <div className="mb-2">
                  <h3 className="text-sm font-medium text-white">Features in {getAppNameFromCode()}</h3>
                  <p className="text-xs text-white/60">Your app includes the following powerful features that will enhance user experience.</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {demoFeatures.slice(0, 8).map((feature) => (
                    <div 
                      key={feature.title}
                      className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3"
                    >
                      <div className="flex mb-1.5 items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <h4 className="text-xs font-medium text-white">{feature.title}</h4>
                      </div>
                      <p className="text-[11px] text-white/70 leading-tight">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
