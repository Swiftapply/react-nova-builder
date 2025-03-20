
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
  // Helper function to get icon based on feature text
  const getFeatureIcon = (feature: string) => {
    const featureText = feature.toLowerCase();
    
    if (featureText.includes('auth') || 
        featureText.includes('login') || 
        featureText.includes('user') || 
        featureText.includes('profile')) {
      return <Zap className="h-3 w-3" />;
    } else if (featureText.includes('notification') || 
               featureText.includes('alert') || 
               featureText.includes('message')) {
      return <AlertCircle className="h-3 w-3" />;
    } else if (featureText.includes('data') || 
               featureText.includes('sync') || 
               featureText.includes('storage') || 
               featureText.includes('save')) {
      return <Star className="h-3 w-3" />;
    } else {
      return <Check className="h-3 w-3" />;
    }
  };
  
  // Helper function to get color based on feature text
  const getFeatureColor = (feature: string) => {
    const featureText = feature.toLowerCase();
    
    if (featureText.includes('auth') || featureText.includes('login') || featureText.includes('user')) {
      return "from-blue-500 to-blue-600";
    } else if (featureText.includes('notification') || featureText.includes('alert')) {
      return "from-amber-500 to-amber-600";
    } else if (featureText.includes('data') || featureText.includes('sync') || featureText.includes('storage')) {
      return "from-emerald-500 to-emerald-600";
    } else if (featureText.includes('share') || featureText.includes('social')) {
      return "from-purple-500 to-purple-600";
    } else if (featureText.includes('offline')) {
      return "from-gray-500 to-gray-600";
    } else {
      return "from-green-500 to-green-600";
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
          if (typeof feature !== 'string') {
            console.warn('Feature is not a string:', feature);
            return null;
          }
          
          const icon = getFeatureIcon(feature);
          const colorClass = getFeatureColor(feature);
          
          return (
            <Card 
              key={index} 
              className="overflow-hidden transition-all hover:shadow-md cursor-pointer text-xs"
              onClick={() => onFeatureClick && onFeatureClick(feature)}
            >
              <div className={`h-1 w-full bg-gradient-to-r ${colorClass}`}></div>
              <CardHeader className="py-2 px-3">
                <div className="flex items-center gap-1.5">
                  <div className={`p-1 rounded-full bg-gradient-to-r ${colorClass} text-white`}>
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
const getFeatureDescription = (feature: string): string => {
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
