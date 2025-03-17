
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Code, Share, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PricingDialog } from '@/components/PricingDialog';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBuilder = location.pathname === '/builder';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-lg border-b border-white/5">
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 font-semibold tracking-tight text-foreground"
        >
          <img src="/logo.svg" alt="WingPilot" className="w-6 h-6" />
          <span>WingPilot</span>
        </button>
      </div>

      {isBuilder && (
        <div className="flex items-center space-x-2">
          <PricingDialog 
            trigger={
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                <Settings className="w-4 h-4 mr-1" />
                Upgrade
              </Button>
            }
          />
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            <Code className="w-4 h-4 mr-1" />
            Code
          </Button>
          <Button size="sm" className="text-xs bg-primary text-primary-foreground hover:bg-primary/90">
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
