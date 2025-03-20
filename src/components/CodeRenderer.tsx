import React, { useMemo } from 'react';
import { parseReactNativeCode } from '@/services/CodeParserService';
import { TimerAppUI } from './code-renderer/TimerAppUI';
import { FinanceAppUI } from './code-renderer/FinanceAppUI';
import { HealthAppUI } from './code-renderer/HealthAppUI';
import { SocialAppUI } from './code-renderer/SocialAppUI';
import { DefaultAppUI } from './code-renderer/DefaultAppUI';
import { StatusBar } from './code-renderer/StatusBar';
import { NavigationBar } from './code-renderer/NavigationBar';
import { SearchBar } from './code-renderer/SearchBar';
import { ListItems } from './code-renderer/ListItems';
import { CardItems } from './code-renderer/CardItems';
import { TabBar } from './code-renderer/TabBar';
import { FloatingActionButton } from './code-renderer/FloatingActionButton';

interface CodeRendererProps {
  code: string;
  platform: 'ios' | 'android';
}

const CodeRenderer: React.FC<CodeRendererProps> = ({ code, platform }) => {
  const parsedUI = useMemo(() => parseReactNativeCode(code), [code]);
  
  if (!parsedUI) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
        <div className="text-red-500 text-sm">Unable to parse React Native code</div>
      </div>
    );
  }
  
  const renderAppContent = () => {
    if (parsedUI.isTimerApp) {
      return <TimerAppUI parsedUI={parsedUI} />;
    } else if (parsedUI.isFinanceApp) {
      return <FinanceAppUI parsedUI={parsedUI} />;
    } else if (parsedUI.isHealthApp) {
      return <HealthAppUI parsedUI={parsedUI} />;
    } else if (parsedUI.isSocialApp) {
      return <SocialAppUI parsedUI={parsedUI} />;
    } else {
      return <DefaultAppUI parsedUI={parsedUI} />;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ 
      backgroundColor: parsedUI.hasDarkMode ? '#18181B' : (parsedUI.isTimerApp ? '#FAFAFA' : 'white'),
      fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <StatusBar platform={platform} />
      
      {/* Main content area - hide scrollbar but keep functionality */}
      <div className={`flex-1 overflow-auto p-3 ${parsedUI.hasScrollView ? 'overflow-y-scroll' : ''}`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Add this to hide scrollbar in WebKit browsers */}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* Render gradient background if detected */}
        {parsedUI.hasGradient && (
          <div className="absolute inset-0" style={{
            background: parsedUI.isTimerApp 
              ? `linear-gradient(135deg, ${parsedUI.primaryColor}CC, ${parsedUI.accentColor}99)` 
              : `linear-gradient(135deg, ${parsedUI.primaryColor}40, ${parsedUI.accentColor}30)`,
            opacity: parsedUI.hasDarkMode ? 0.7 : 0.4,
            zIndex: 0
          }}></div>
        )}
        
        {/* Main content container with relative positioning for elements */}
        <div className="relative z-10 flex flex-col gap-4">
          {parsedUI.hasHeader && <NavigationBar parsedUI={parsedUI} />}
          {parsedUI.hasSearchBar && <SearchBar parsedUI={parsedUI} />}
          
          {renderAppContent()}
          
          {parsedUI.hasFlatList && <ListItems parsedUI={parsedUI} />}
          {parsedUI.hasCard && !parsedUI.hasFlatList && <CardItems parsedUI={parsedUI} />}
        </div>
      </div>
      
      {parsedUI.hasTabBar && <TabBar parsedUI={parsedUI} />}
      {parsedUI.hasFAB && <FloatingActionButton parsedUI={parsedUI} />}
    </div>
  );
};

export default CodeRenderer;
