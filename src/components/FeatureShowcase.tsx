import React from 'react';
import { Check, Zap, Star, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeatureShowcaseProps {
  features: string[];
  appName?: string;
  onFeatureClick?: (feature: string) => void;
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ 
  features, 
  appName = 'Your App', 
  onFeatureClick 
}) => {
  // Group features into categories for better organization
  const categorizeFeature = (feature: string | any): string => {
    // Check if feature is a string before calling toLowerCase
    if (typeof feature !== 'string') {
      console.warn('Feature is not a string:', feature);
      return 'other'; // Default category
    }
    
    const featureText = feature.toLowerCase();
    
    if (featureText.includes('auth') || 
        featureText.includes('login') || 
        featureText.includes('user') || 
        featureText.includes('profile')) {
      return 'auth';
    } else if (featureText.includes('notification') || 
               featureText.includes('alert') || 
               featureText.includes('message')) {
      return 'notifications';
    } else if (featureText.includes('data') || 
               featureText.includes('sync') || 
               featureText.includes('storage') || 
               featureText.includes('save')) {
      return 'data';
    } else if (featureText.includes('share') || 
               featureText.includes('social') || 
               featureText.includes('connect')) {
      return 'social';
    } else if (featureText.includes('offline') || 
               featureText.includes('cache')) {
      return 'offline';
    } else {
      return 'other';
    }
  };

  return (
    <div className="p-2">
      <div className="mb-3">
        <h2 className="text-base font-semibold mb-1">Features in {appName}</h2>
        <p className="text-xs text-muted-foreground">
          Your app includes the following powerful features that will enhance user experience.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {features && features.map((feature, index) => {
          // Ensure feature is a string
          const featureStr = typeof feature === 'string' ? feature : 
            (feature && typeof feature.toString === 'function' ? feature.toString() : 'Unknown feature');
          
          const { icon, color } = categorizeFeature(featureStr);
          
          return (
            <Card 
              key={index} 
              className="overflow-hidden transition-all hover:shadow-md cursor-pointer text-xs"
              onClick={() => onFeatureClick && onFeatureClick(feature)}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${color}`}></div>
              <CardHeader className="py-2 px-3">
                <div className="flex items-center gap-1.5">
                  <div className={`p-1 rounded-full bg-gradient-to-r ${color} text-white`}>
                    {icon}
                  </div>
                  <CardTitle className="text-xs font-medium truncate">{feature}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-1 px-3">
                <CardDescription className="text-xs line-clamp-2 h-8 overflow-hidden">
                  {getFeatureDescription(feature)}
                </CardDescription>
              </CardContent>
              <CardFooter className="py-1 px-3 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-6 px-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFeatureClick && onFeatureClick(feature);
                  }}
                >
                  Details
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to generate descriptions for features
const getFeatureDescription = (feature: any): string => {
  // Check if feature is a string before calling toLowerCase
  if (typeof feature !== 'string') {
    console.warn('Feature is not a string in getFeatureDescription:', feature);
    return 'This feature enhances your app functionality.';
  }
  
  const featureText = feature.toLowerCase();
  
  if (featureText.includes('auth') || featureText.includes('login') || featureText.includes('user')) {
    return 'Secure user authentication and profile management.';
  } else if (featureText.includes('notification') || featureText.includes('alert')) {
    return 'Real-time notifications to keep users engaged.';
  } else if (featureText.includes('data') || featureText.includes('sync') || featureText.includes('storage')) {
    return 'Seamless data synchronization across devices.';
  } else if (featureText.includes('share') || featureText.includes('social')) {
    return 'Integrated social sharing capabilities.';
  } else if (featureText.includes('offline')) {
    return 'Full functionality even without internet connection.';
  } else {
    return 'This feature enhances your app functionality.';
  }
};

export default FeatureShowcase;