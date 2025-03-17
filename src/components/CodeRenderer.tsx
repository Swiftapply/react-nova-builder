import React from 'react';
import { useMemo } from 'react';

interface CodeRendererProps {
  code: string;
  platform: 'ios' | 'android';
}

// This component will parse and render React Native code as a modern, aesthetically pleasing visual UI
const CodeRenderer: React.FC<CodeRendererProps> = ({ code, platform }) => {
  // Parse the code to extract UI elements and structure
  const parsedUI = useMemo(() => {
    if (!code) return null;
    
    try {
      // Extract app name from the code
      const appNameMatch = code.match(/const\s+([A-Za-z0-9_]+)App\s*=/i) || 
                           code.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/i) ||
                           code.match(/class\s+([A-Za-z0-9_]+)App/i);
      const appName = appNameMatch ? appNameMatch[1] : 'StrideSyncApp';

      // Enhanced UI pattern detection
      const hasScrollView = code.includes('ScrollView');
      const hasSafeAreaView = code.includes('SafeAreaView');
      const hasFlatList = code.includes('FlatList');
      const hasTabBar = code.includes('TabBar') || code.includes('BottomTab') || 
                       code.includes('createBottomTabNavigator') || code.includes('tabBarIcon');
      const hasHeader = code.includes('Header') || code.includes('AppBar') || 
                       code.includes('NavigationBar') || code.includes('headerTitle');
      const hasCard = code.includes('Card') || code.includes('shadow') || 
                     code.includes('elevation') || code.includes('borderRadius') && code.includes('padding');
      const hasGradient = code.includes('Gradient') || code.includes('LinearGradient');
      const hasAnimation = code.includes('Animated') || code.includes('FadeIn') || 
                         code.includes('SlideInRight') || code.includes('animation') ||
                         code.includes('useAnimatedStyle') || code.includes('withTiming');
      
      // Enhanced color extraction with fallbacks to modern color schemes
      const primaryColorMatch = code.match(/(?:primary|main|theme|brand)Color["':\s]*['"]?(#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|[a-z]+)['"]?/i);
      let primaryColor = primaryColorMatch ? primaryColorMatch[1] : 
                        code.includes('dark') ? '#6366F1' : '#4F46E5';
      
      // More sophisticated accent color detection
      const accentColorMatch = code.match(/(?:accent|secondary|highlight|tint)Color["':\s]*['"]?(#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|[a-z]+)['"]?/i);
      let accentColor = accentColorMatch ? accentColorMatch[1] : 
                         code.includes('dark') ? '#818CF8' : '#60A5FA';
      
      // Detect app type for better styling
      const isFinanceApp = code.toLowerCase().includes('finance') || 
                          code.toLowerCase().includes('bank') || 
                          code.toLowerCase().includes('payment') ||
                          code.toLowerCase().includes('wallet') ||
                          code.toLowerCase().includes('transaction');
                          
      const isHealthApp = code.toLowerCase().includes('health') || 
                         code.toLowerCase().includes('fitness') || 
                         code.toLowerCase().includes('workout') ||
                         code.toLowerCase().includes('medical') ||
                         code.toLowerCase().includes('exercise');
                         
      const isSocialApp = code.toLowerCase().includes('social') || 
                         code.toLowerCase().includes('profile') || 
                         code.toLowerCase().includes('friend') ||
                         code.toLowerCase().includes('follow') ||
                         code.toLowerCase().includes('post');
      
      // Apply theme colors based on app type
      if (isFinanceApp && !primaryColorMatch) {
        primaryColor = '#047857';
        accentColor = '#10B981';
      } else if (isHealthApp && !primaryColorMatch) {
        primaryColor = '#0EA5E9';
        accentColor = '#38BDF8';
      } else if (isSocialApp && !primaryColorMatch) {
        primaryColor = '#8B5CF6';
        accentColor = '#A78BFA';
      }
      
      // More sophisticated UI detection
      const hasBottomSheet = code.includes('BottomSheet') || 
                            code.includes('bottom-sheet') || 
                            code.includes('Modal') && code.includes('bottom');
                            
      const hasSwipeableList = code.includes('Swipeable') || 
                              code.includes('swipe') && (code.includes('List') || code.includes('Item'));
                              
      const hasSearchBar = code.includes('Search') || 
                          code.includes('search') && code.includes('input') ||
                          code.includes('filter');
                          
      const hasNotifications = code.includes('Notification') || 
                              code.includes('notification') ||
                              code.includes('badge') ||
                              code.includes('alert');
      
      // Extract tertiary color
      const tertiaryColorMatch = code.match(/(?:tertiary|third)Color["':\s]*['"]?(#[0-9A-Fa-f]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|[a-z]+)['"]?/i);
      let tertiaryColor = tertiaryColorMatch ? tertiaryColorMatch[1] : '#A5B4FC';
      
      // Extract text content
      const textContentMatches = code.match(/[<{]Text[^>}]*>([^<{]*)<\/Text>/g) || [];
      const textContent = textContentMatches
        .map(match => {
          const content = match.replace(/[<{]Text[^>}]*>([^<{]*)<\/Text>/, '$1').trim();
          return content.length > 0 ? content : null;
        })
        .filter(Boolean) as string[];
      
      // Extract button labels
      const buttonLabelMatches = code.match(/Button[^>}]*(?:title|label)=["']([^"']*)["']/g) || [];
      const buttonLabels = buttonLabelMatches
        .map(match => {
          const label = match.replace(/Button[^>}]*(?:title|label)=["']([^"']*)["']/, '$1').trim();
          return label.length > 0 ? label : null;
        })
        .filter(Boolean) as string[];
      
      // Count buttons
      const buttonCount = (code.match(/Button/g) || []).length;
      
      // Extract form elements
      const hasForm = code.includes('TextInput') || code.includes('form') || code.includes('Form') || 
                     code.includes('input') || code.includes('Checkbox') || code.includes('Radio');
      
      // Extract label texts
      const labelMatches = code.match(/[<{]Text[^>}]*>([^<{]*label|Label|LABEL[^<{]*)<\/Text>/g) || [];
      const labelTexts = labelMatches
        .map(match => {
          const content = match.replace(/[<{]Text[^>}]*>([^<{]*)<\/Text>/, '$1').trim();
          return content.length > 0 ? content : null;
        })
        .filter(Boolean) as string[];
      
      // Detect navigation
      const hasNavigation = code.includes('navigation') || code.includes('Navigation') || 
                           code.includes('navigator') || code.includes('Navigator') ||
                           code.includes('Screen') || code.includes('Route');
      
      // Detect SectionList
      const hasSectionList = code.includes('SectionList');
      
      // Detect if it's a meditation app
      const isMeditationApp = code.includes('meditation') || code.includes('Meditation') || 
                             code.includes('mindful') || code.includes('breathe') || 
                             code.includes('relax') || code.includes('calm');
      
      // Extract image sources
      const imageMatches = code.match(/source=\{\{\s*uri:\s*['"]([^'"]+)['"]\s*\}\}/g) || [];
      const hasImages = imageMatches.length > 0;
      
      // Detect if using Paper components
      const usesPaperUI = code.includes('PaperProvider') || code.includes('react-native-paper');
      
      // Detect dark mode
      const hasDarkMode = code.includes('darkMode') || code.includes('dark:') || 
                         code.includes('theme.dark') || code.includes('#18181B') || 
                         code.includes('#27272A') || code.includes('darkTheme');
      
      // Detect swipe actions
      const hasSwipeActions = code.includes('swipe') || code.includes('Swipeable') || 
                             code.includes('PanGestureHandler');
      
      // Add missing variable definitions
      const hasFAB = code.includes('FAB') || code.includes('FloatingActionButton') || 
                    code.includes('floating action') || code.includes('fab');
      
      const hasTimer = code.includes('Timer') || code.includes('countdown') || 
                       code.includes('setInterval') || code.includes('setTimeout');
      
      // Return enhanced UI data
      return {
        appName,
        hasScrollView,
        hasSafeAreaView,
        hasFlatList,
        hasTabBar,
        hasHeader,
        hasCard,
        hasGradient,
        hasAnimation,
        hasFAB,
        hasTimer,
        hasImages,
        usesPaperUI,
        hasDarkMode,
        isMeditationApp,
        primaryColor,
        accentColor,
        tertiaryColor,
        textContent,
        labelTexts,
        buttonCount,
        buttonLabels,
        hasForm,
        hasNavigation,
        hasSectionList,
        hasSwipeActions,
        
        // New properties
        isFinanceApp,
        isHealthApp,
        isSocialApp,
        hasBottomSheet,
        hasSwipeableList,
        hasSearchBar,
        hasNotifications,
        
        // Extract screen count for navigation
        screenCount: (code.match(/Screen/g) || []).length || 
                    (code.match(/createStackNavigator/g) || []).length > 0 ? 3 : 1
      };
    } catch (error) {
      console.error('Error parsing React Native code:', error);
      return null;
    }
  }, [code]);
  
  if (!parsedUI) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
        <div className="text-red-500 text-sm">Unable to parse React Native code</div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ 
      backgroundColor: parsedUI.hasDarkMode ? '#18181B' : (parsedUI.isMeditationApp ? '#F9FAFB' : 'white'),
      fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Main content area - hide scrollbar but keep functionality */}
      <div className={`flex-1 overflow-auto p-3 ${parsedUI.hasScrollView ? 'overflow-y-scroll' : ''}`}
        style={{
          scrollbarWidth: 'none', /* Firefox */
          msOverflowStyle: 'none', /* IE and Edge */
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
            background: parsedUI.isMeditationApp 
              ? `linear-gradient(135deg, ${parsedUI.primaryColor}CC, ${parsedUI.accentColor}99, ${parsedUI.tertiaryColor}66)` 
              : `linear-gradient(135deg, ${parsedUI.primaryColor}40, ${parsedUI.accentColor}30)`,
            opacity: parsedUI.hasDarkMode ? 0.7 : 0.4,
            zIndex: 0
          }}></div>
        )}
        
        {/* Main content container with relative positioning for elements */}
        <div className="relative z-10 flex flex-col gap-4">
          {/* Render search bar if detected */}
          {parsedUI.hasSearchBar && (
            <div className="mb-4">
              <div 
                className="w-full px-3 py-2 rounded-lg flex items-center gap-2"
                style={{
                  backgroundColor: parsedUI.hasDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  border: parsedUI.hasDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                    stroke={parsedUI.hasDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="text-[12px]" style={{ color: parsedUI.hasDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                  Search...
                </div>
              </div>
            </div>
          )}
          
          {/* Render text content */}
          {parsedUI.textContent.length > 0 && (
            <div className="mb-4">
              {parsedUI.textContent.map((text, index) => (
                <div 
                  key={`text-${index}`}
                  className={`${index === 0 ? 'text-[14px] font-medium' : 'text-[12px]'} ${parsedUI.hasDarkMode ? 'text-white/90' : 'text-gray-800'} mb-2`}
                >
                  {text}
                </div>
              ))}
            </div>
          )}
          
          {/* Render buttons if detected */}
          {parsedUI.buttonCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from({ length: Math.min(parsedUI.buttonCount, 3) }).map((_, index) => (
                <button
                  key={`button-${index}`}
                  className="px-3 py-2 rounded-lg text-[12px] font-medium"
                  style={{
                    backgroundColor: index === 0 ? parsedUI.primaryColor : 'transparent',
                    color: index === 0 ? 'white' : parsedUI.primaryColor,
                    border: index === 0 ? 'none' : `1px solid ${parsedUI.primaryColor}`,
                    boxShadow: index === 0 ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {parsedUI.buttonLabels && parsedUI.buttonLabels[index] 
                    ? parsedUI.buttonLabels[index] 
                    : index === 0 ? 'Submit' : index === 1 ? 'Cancel' : 'Reset'}
                </button>
              ))}
            </div>
          )}
          
          {/* Render list items for FlatList or SectionList */}
          {(parsedUI.hasFlatList || parsedUI.hasSectionList) && (
            <div className="mb-4">
              {parsedUI.hasSectionList && (
                <div className="mb-2 text-[12px] font-semibold" style={{ color: parsedUI.hasDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                  Section Title
                </div>
              )}
              
              {Array.from({ length: 3 }).map((_, index) => (
                <div 
                  key={`list-item-${index}`}
                  className={`mb-2 p-3 rounded-lg flex items-center justify-between ${parsedUI.hasSwipeableList ? 'border-l-4' : ''}`}
                  style={{
                    backgroundColor: parsedUI.hasDarkMode ? 'rgba(255,255,255,0.08)' : 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    borderColor: parsedUI.primaryColor,
                    borderLeftWidth: parsedUI.hasSwipeableList ? '4px' : '0'
                  }}
                >
                  <div className="flex items-center gap-2">
                    {parsedUI.isFinanceApp && (
                      <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${parsedUI.primaryColor}40` }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" 
                            stroke={parsedUI.primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    
                    {parsedUI.isHealthApp && (
                      <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center" style={{ backgroundColor: `${parsedUI.primaryColor}40` }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 12H18L15 21L9 3L6 12H2" stroke={parsedUI.primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    
                    <div>
                      <div className="text-[12px] font-medium" style={{ color: parsedUI.hasDarkMode ? 'white' : 'black' }}>
                        {parsedUI.isFinanceApp ? `Transaction #${index + 1}` : 
                         parsedUI.isHealthApp ? `Workout #${index + 1}` : 
                         parsedUI.isSocialApp ? `Post #${index + 1}` : `Item ${index + 1}`}
                      </div>
                      <div className="text-[10px]" style={{ color: parsedUI.hasDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                        {parsedUI.isFinanceApp ? `$${(index + 1) * 10}.00 • Yesterday` : 
                         parsedUI.isHealthApp ? `30 mins • 250 cal` : 
                         parsedUI.isSocialApp ? `2h ago • 15 likes` : `Subtitle for item ${index + 1}`}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" 
                        stroke={parsedUI.hasDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"} 
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Render cards if detected */}
          {parsedUI.hasCard && !parsedUI.hasFlatList && !parsedUI.hasSectionList && (
            <div className="mb-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <div 
                  key={`card-${index}`}
                  className="rounded-lg p-3 mb-3"
                  style={{
                    backgroundColor: parsedUI.hasDarkMode ? 'rgba(255,255,255,0.08)' : 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                    border: parsedUI.hasDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <div className="text-[12px] font-medium mb-1" style={{ color: parsedUI.hasDarkMode ? 'white' : 'black' }}>
                    {parsedUI.isFinanceApp ? `Account Balance` : 
                     parsedUI.isHealthApp ? `Today's Progress` : 
                     parsedUI.isSocialApp ? `Recent Activity` : `Card Title ${index + 1}`}
                  </div>
                  <div className="text-[10px] mb-2" style={{ color: parsedUI.hasDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                    {parsedUI.isFinanceApp ? `Current balance across all accounts` : 
                     parsedUI.isHealthApp ? `You're making great progress!` : 
                     parsedUI.isSocialApp ? `3 new notifications` : `Card subtitle with more information`}
                  </div>
                  
                  {parsedUI.isFinanceApp && (
                    <div className="text-[16px] font-bold mb-2" style={{ color: parsedUI.hasDarkMode ? 'white' : 'black' }}>
                      ${(index + 1) * 1250}.00
                    </div>
                  )}
                  
                  {parsedUI.isHealthApp && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className="h-2 rounded-full" style={{ width: `${(index + 1) * 30}%`, backgroundColor: parsedUI.primaryColor }}></div>
                    </div>
                  )}
                  
                  {parsedUI.isSocialApp && (
                    <div className="flex -space-x-2 mb-2">
                      {Array.from({ length: 3 }).map((_, userIndex) => (
                        <div 
                          key={`user-${userIndex}`}
                          className="w-[20px] h-[20px] rounded-full border-2"
                          style={{ 
                            backgroundColor: `hsl(${userIndex * 40}, 70%, 60%)`,
                            borderColor: parsedUI.hasDarkMode ? '#18181B' : 'white'
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <button
                      className="px-2 py-1 rounded text-[10px] font-medium"
                      style={{
                        backgroundColor: 'transparent',
                        color: parsedUI.primaryColor,
                        border: `1px solid ${parsedUI.primaryColor}`
                      }}
                    >
                      {parsedUI.isFinanceApp ? 'View Details' : 
                       parsedUI.isHealthApp ? 'See More' : 
                       parsedUI.isSocialApp ? 'View All' : 'Learn More'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom tab bar if detected */}
      {parsedUI.hasTabBar && (
        <div 
          className="flex items-center justify-around py-2 px-1"
          style={{
            backgroundColor: parsedUI.hasDarkMode ? '#121212' : 'white',
            borderTop: parsedUI.hasDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            boxShadow: '0 -1px 3px rgba(0,0,0,0.05)'
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div 
              key={`tab-${index}`}
              className="flex flex-col items-center"
              style={{
                color: index === 0 ? parsedUI.primaryColor : (parsedUI.hasDarkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)')
              }}
            >
              <div className="w-[20px] h-[20px] flex items-center justify-center">
                {index === 0 && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
                      stroke={index === 0 ? parsedUI.primaryColor : (parsedUI.hasDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")} 
                      fill={index === 0 ? `${parsedUI.primaryColor}20` : "none"}
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div className="text-[8px] mt-1">
                {index === 0 ? 'Home' : 
                 index === 1 ? 'Search' : 
                 index === 2 ? 'Activity' : 'Profile'}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Floating Action Button if detected */}
      {parsedUI.hasFAB && (
        <div 
          className="absolute bottom-20 right-4 w-[40px] h-[40px] rounded-full flex items-center justify-center"
          style={{
            backgroundColor: parsedUI.primaryColor,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default CodeRenderer;
