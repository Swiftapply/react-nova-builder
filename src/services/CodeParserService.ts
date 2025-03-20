
// Modify the parseReactNativeCode function to handle additional app properties

export const parseReactNativeCode = (code: string) => {
  if (!code) return null;
  
  // Basic UI patterns detection
  const hasNavigationImport = code.includes('react-navigation') || code.includes('NavigationContainer');
  const hasScrollView = code.includes('ScrollView') || code.includes('FlatList') || code.includes('scrollView');
  const hasHeader = code.includes('Header') || code.includes('Appbar') || code.includes('Toolbar') || (code.match(/style={[^}]*header/i) !== null);
  const hasSearchBar = code.includes('SearchBar') || code.includes('search') || code.includes('TextInput') && code.includes('search');
  const hasFlatList = code.includes('FlatList') || code.includes('flatlist');
  const hasCard = code.includes('Card') || code.includes('card');
  const hasTabBar = code.includes('TabBar') || code.includes('BottomTabNavigator') || code.includes('createBottomTabNavigator');
  const hasFAB = code.includes('FloatingActionButton') || code.includes('FAB');
  const hasGradient = code.includes('LinearGradient') || code.includes('gradient');
  const hasDarkMode = code.includes('darkMode') || code.includes('dark-mode') || code.includes('dark theme');
  
  // App type detection based on code patterns
  const isTimerApp = code.includes('timer') || code.includes('pomodoro') || code.includes('countdown') || code.includes('stopwatch');
  const isFinanceApp = code.includes('finance') || code.includes('budget') || code.includes('expense') || code.includes('money') || code.includes('payment');
  const isHealthApp = code.includes('health') || code.includes('fitness') || code.includes('workout') || code.includes('exercise');
  const isSocialApp = code.includes('social') || code.includes('profile') || code.includes('follower') || code.includes('friend') || code.includes('post');
  
  // Extract app title and description if available
  const appTitleMatch = code.match(/title[=:]\s*['"]([^'"]+)['"]/i) || 
                        code.match(/AppBar[^>]*>([^<]+)</i) || 
                        code.match(/header[^>]*>([^<]+)</i);
  
  const appTitle = appTitleMatch ? appTitleMatch[1] : null;
  
  // Extract colors from the code
  const primaryColorMatch = code.match(/primary(?:Color)?[=:]\s*['"]([^'"]+)['"]/i) || 
                           code.match(/theme[^}]*primary[=:]\s*['"]([^'"]+)['"]/i);
  
  const accentColorMatch = code.match(/accent(?:Color)?[=:]\s*['"]([^'"]+)['"]/i) || 
                          code.match(/secondary(?:Color)?[=:]\s*['"]([^'"]+)['"]/i);
  
  // Extract main content text if available
  const mainContentTextMatch = code.match(/Text[^>]*>([^<]{5,})</i);
  
  // Determine if the app has main content container
  const hasMainContent = code.includes('View') || code.includes('Container') || code.includes('div');
  
  return {
    // App type
    isTimerApp,
    isFinanceApp,
    isHealthApp,
    isSocialApp,
    
    // UI patterns
    hasNavigationImport,
    hasScrollView,
    hasHeader,
    hasSearchBar,
    hasFlatList,
    hasCard,
    hasTabBar,
    hasFAB,
    hasGradient,
    hasDarkMode,
    hasMainContent,
    
    // Navigation patterns
    hasBackButton: code.includes('goBack') || code.includes('BackButton') || code.includes('BackHandler'),
    hasMenuButton: code.includes('menu') || code.includes('drawer') || code.includes('Navigation'),
    
    // Text content
    appTitle,
    description: code.match(/description[=:]\s*['"]([^'"]+)['"]/i)?.[1] || null,
    screenTitle: code.match(/screenTitle[=:]\s*['"]([^'"]+)['"]/i)?.[1] || null,
    mainContentText: mainContentTextMatch?.[1]?.trim() || null,
    
    // Colors and styling
    primaryColor: primaryColorMatch?.[1] || '#4F46E5',
    accentColor: accentColorMatch?.[1] || '#10B981',
    primaryTextColor: hasDarkMode ? '#FFFFFF' : '#111827',
    secondaryTextColor: hasDarkMode ? '#94A3B8' : '#4B5563',
  };
};

// Generate demo features for mock data
export const generateDemoFeatures = (appName: string) => {
  // Standard app features that might appear in various apps
  const standardFeatures = [
    { title: 'User Authentication', description: 'Secure login and registration system with profile management.' },
    { title: 'Push Notifications', description: 'Real-time alerts and reminders to keep users engaged.' },
    { title: 'Offline Storage', description: 'Access content and features even without an internet connection.' },
    { title: 'Data Synchronization', description: 'Keep data in sync across multiple devices seamlessly.' }
  ];
  
  // App-specific features based on app name or type
  const getAppSpecificFeatures = () => {
    const name = appName.toLowerCase();
    
    if (name.includes('fitness') || name.includes('workout') || name.includes('health')) {
      return [
        { title: 'Workout Tracking', description: 'Track your exercises, sets, reps, and weights in real-time.' },
        { title: 'Progress Visualization', description: 'Charts and graphs to visualize your fitness progress.' },
        { title: 'Custom Workouts', description: 'Create and save personalized workout routines.' },
        { title: 'Health Metrics', description: 'Monitor vital health statistics and body measurements.' }
      ];
    }
    
    if (name.includes('todo') || name.includes('task') || name.includes('productivity') || name.includes('pomo')) {
      return [
        { title: 'Task Management', description: 'Create, organize, and prioritize tasks efficiently.' },
        { title: 'Custom Categories', description: 'Organize tasks with custom tags and categories.' },
        { title: 'Pomodoro Timer', description: 'Built-in productivity timer with customizable intervals.' },
        { title: 'Progress Statistics', description: 'Detailed analytics on your productivity patterns.' }
      ];
    }
    
    if (name.includes('finance') || name.includes('budget') || name.includes('money')) {
      return [
        { title: 'Expense Tracking', description: 'Log and categorize all your expenses in one place.' },
        { title: 'Budget Planning', description: 'Create and manage budgets with customizable categories.' },
        { title: 'Financial Reports', description: 'Visualize spending patterns with interactive charts.' },
        { title: 'Bill Reminders', description: 'Never miss a payment with automated bill reminders.' }
      ];
    }
    
    if (name.includes('social') || name.includes('chat') || name.includes('message') || name.includes('pic')) {
      return [
        { title: 'User Profiles', description: 'Customizable profiles with photos and personal info.' },
        { title: 'Social Feed', description: 'Real-time feed with posts from connections.' },
        { title: 'Messaging', description: 'Private messaging with media sharing capabilities.' },
        { title: 'Content Discovery', description: 'Discover new content and users based on interests.' }
      ];
    }
    
    // Default features for other app types
    return [
      { title: 'Customizable UI', description: 'Personalize the app appearance to match your preferences.' },
      { title: 'Search Functionality', description: 'Quickly find exactly what you need within the app.' },
      { title: 'Favorites', description: 'Save and organize your favorite items for quick access.' },
      { title: 'Regular Updates', description: 'Continuous improvements and new features over time.' }
    ];
  };
  
  return [...getAppSpecificFeatures(), ...standardFeatures];
};
