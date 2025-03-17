import React, { useState, useEffect } from 'react';
import { Check, Smartphone, ExternalLink, Code } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import QRCode from 'qrcode';
import CodeRenderer from './CodeRenderer';

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

  return (
    <div className="flex flex-1 flex-col p-2">
      <div className="flex flex-1 flex-row items-start justify-start">
        {/* Left side - Device selection controls */}
        <div className="flex-1 max-w-[25%] mb-4 mr-12">
          <div className="flex flex-row justify-between items-center mb-2">
            <Label className="text-sm text-white/70">Device Preview</Label>
            <div className="text-xs opacity-50 text-white">{currentPhone.name}</div>
          </div>
          
          <div className="flex gap-2 mb-4">
            <button 
              className={`px-6 py-1.5 rounded-full ${selectedOS === 'ios' ? 'bg-white/10 border border-white/5 text-white' : 'bg-transparent text-white/70'}`}
              onClick={() => handleOSChange('ios')}
            >
              iOS
            </button>
            <button 
              className={`px-6 py-1.5 rounded-full ${selectedOS === 'android' ? 'bg-white/10 border border-white/5 text-white' : 'bg-transparent text-white/70'}`}
              onClick={() => handleOSChange('android')}
            >
              Android
            </button>
          </div>
          
          <Select
            value={selectedPhoneModel}
            onValueChange={setSelectedPhoneModel}
          >
            <SelectTrigger className="w-full bg-secondary border-none text-white">
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              {phoneModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name} ({model.releaseYear})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="mt-2 text-xs text-white/50">
            {currentPhone.width} × {currentPhone.height}px • {currentPhone.releaseYear}
          </div>
        </div>
        
        {/* Center - Phone preview */}
        <div className="w-full md:w-2/4 flex justify-center items-center h-full">
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
            <div className="w-full h-full bg-black rounded-[32px] overflow-hidden flex items-center justify-center relative">
              {/* Status bar */}
              <div className="absolute top-0 left-0 right-0 h-6 flex justify-between items-center px-4 z-40 bg-black">
                <div className="text-[8px] text-white">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                <div className="flex items-center gap-1">
                  {/* Network signal */}
                  {selectedOS === 'ios' ? (
                    <div className="flex items-center gap-0.5">
                      <div className="text-[8px] text-white">5G</div>
                      <div className="relative w-[12px] h-[8px]">
                        <div className="absolute bottom-0 left-0 w-[2px] h-[3px] bg-white/80"></div>
                        <div className="absolute bottom-0 left-[3px] w-[2px] h-[4px] bg-white/80"></div>
                        <div className="absolute bottom-0 left-[6px] w-[2px] h-[5px] bg-white/80"></div>
                        <div className="absolute bottom-0 left-[9px] w-[2px] h-[6px] bg-white/80"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-0.5">
                      <div className="text-[8px] text-white">5G</div>
                      <div className="relative w-[12px] h-[8px]">
                        <div className="absolute bottom-0 left-0 w-[2px] h-[3px] bg-white/80"></div>
                        <div className="absolute bottom-0 left-[3px] w-[2px] h-[4px] bg-white/80"></div>
                        <div className="absolute bottom-0 left-[6px] w-[2px] h-[5px] bg-white/80"></div>
                        <div className="absolute bottom-0 left-[9px] w-[2px] h-[6px] bg-white/80"></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Battery */}
                  <div className="relative w-[14px] h-[8px] border border-white/80 rounded-sm overflow-hidden flex items-center">
                    <div className="absolute right-[1px] top-[1px] bottom-[1px] left-[1px] bg-white/80 rounded-sm" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Actual content */}
              {previewCode ? (
                <div className="w-full h-full pt-6">
                  <CodeRenderer code={previewCode} platform={selectedOS as 'ios' | 'android'} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  {qrCodeImage ? (
                    <>
                      <img src={qrCodeImage} alt="QR Code" className="w-[150px] h-[150px] mb-4" />
                      <div className="text-[10px] text-white/70 mb-1">Scan with your phone camera</div>
                      <div className="flex items-center gap-1 text-[10px] text-white/50">
                        <ExternalLink size={10} />
                        <span>Open preview on your device</span>
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
        
        {/* Right side - QR code and info */}
        <div className="flex-1 max-w-[25%] ml-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center mb-2">
              <Label className="text-sm text-white/70">Preview Options</Label>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone size={16} className="text-white/70" />
                <span className="text-sm text-white/90">Mobile Preview</span>
              </div>
              <div className="text-xs text-white/50 mb-4">
                View how your app will look on a mobile device. Scan the QR code to open on your phone.
              </div>
              
              {qrCodeImage && (
                <div className="flex items-center justify-center bg-white p-2 rounded-md">
                  <img src={qrCodeImage} alt="QR Code" className="w-[120px] h-[120px]" />
                </div>
              )}
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Check size={16} className="text-white/70" />
                <span className="text-sm text-white/90">Features</span>
              </div>
              <div className="text-xs text-white/50">
                Your app includes modern mobile features like responsive design, dark mode support, and touch-optimized controls.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
