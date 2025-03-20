
// Service to parse and extract usable components from React Native code
export const parseReactNativeCode = (code: string) => {
  if (!code) return null;
  
  try {
    // Extract basic metadata
    const appNameMatch = code.match(/const\s+([A-Za-z0-9_]+)(?:App)?\s*=/i) || 
                         code.match(/export\s+default\s+function\s+([A-Za-z0-9_]+)/i) ||
                         code.match(/class\s+([A-Za-z0-9_]+)(?:App)?/i);
    const appName = appNameMatch ? appNameMatch[1] : 'App';
    
    // Extract screens or views from the code
    const screens: string[] = [];
    
    // Look for component definitions that might be screens
    const screenMatches = code.match(/(?:const|function|class)\s+([A-Za-z0-9_]+Screen)\s*(?:=|extends)/g);
    if (screenMatches) {
      screenMatches.forEach(match => {
        const screenName = match.replace(/(?:const|function|class)\s+/, '').replace(/\s*(?:=|extends).*/, '');
        screens.push(screenName);
      });
    }
    
    // If no explicit screens were found, look for View components that might be screens
    if (screens.length === 0) {
      // If code contains StackNavigator, TabNavigator, or Screen components, extract those
      const navigationMatches = code.match(/(?:<|name=")([A-Za-z0-9_]+Screen)(?:"|>)/g);
      if (navigationMatches) {
        navigationMatches.forEach(match => {
          const screenName = match.replace(/[<"=>]/g, '');
          if (!screens.includes(screenName)) {
            screens.push(screenName);
          }
        });
      }
    }
    
    // Default screens if none were detected
    if (screens.length === 0) {
      const defaultScreens = ['HomeScreen', 'LoginScreen', 'ProfileScreen', 'SettingsScreen'];
      
      // Determine which default screens might be relevant based on code content
      defaultScreens.forEach(screen => {
        if (code.toLowerCase().includes(screen.toLowerCase().replace('Screen', ''))) {
          screens.push(screen);
        }
      });
      
      // If still no screens, add HomeScreen as default
      if (screens.length === 0) {
        screens.push('HomeScreen');
      }
    }
    
    // Extract features from comments or function names
    const features: string[] = [];
    
    // Look for comments that describe features
    const featureCommentMatches = code.match(/\/\/\s*(?:Feature|TODO):\s*([^\n]+)/g);
    if (featureCommentMatches) {
      featureCommentMatches.forEach(match => {
        const feature = match.replace(/\/\/\s*(?:Feature|TODO):\s*/, '').trim();
        features.push(feature);
      });
    }
    
    // Look for function names that might indicate features
    const functionMatches = code.match(/(?:const|function)\s+handle([A-Z][A-Za-z0-9_]+)\s*=/g);
    if (functionMatches) {
      functionMatches.forEach(match => {
        const featureName = match.replace(/(?:const|function)\s+handle/, '')
                                .replace(/\s*=.*/, '')
                                .replace(/([A-Z])/g, ' $1')
                                .trim();
        features.push(featureName);
      });
    }
    
    // Default features if none detected
    if (features.length === 0) {
      if (code.toLowerCase().includes('timer')) {
        features.push('Timer Display', 'Customizable Intervals', 'Notifications', 'Auto Start Breaks');
        features.push('Task Tracking', 'Statistics', 'Dark Mode', 'Widget Support');
      } else if (code.toLowerCase().includes('login') || code.toLowerCase().includes('auth')) {
        features.push('User Authentication', 'Profile Management', 'Data Synchronization', 'Push Notifications');
      } else {
        features.push('Modern UI', 'Responsive Design', 'Cross-platform Support', 'Offline Functionality');
      }
    }
    
    return {
      appName,
      screens,
      features,
      code
    };
  } catch (error) {
    console.error('Error parsing React Native code:', error);
    return null;
  }
};

// Function to generate preset demo features
export const generateDemoFeatures = (appName: string): { title: string, description: string, icon: string }[] => {
  const appNameLower = appName.toLowerCase();
  
  if (appNameLower.includes('timer') || appNameLower.includes('pomodoro')) {
    return [
      {
        title: 'Customizable Intervals',
        description: 'Set custom work and break intervals to suit your preferences.',
        icon: 'clock'
      },
      {
        title: 'Timer Display',
        description: 'Clear and large timer display to easily see the remaining time.',
        icon: 'timer'
      },
      {
        title: 'Notifications',
        description: 'Receive notifications when a work or break interval ends.',
        icon: 'bell'
      },
      {
        title: 'Auto Start Breaks',
        description: 'Automatically start break intervals after work intervals end.',
        icon: 'play'
      },
      {
        title: 'Task Tracking',
        description: 'Track the tasks you complete during each work interval.',
        icon: 'check-square'
      },
      {
        title: 'Statistics',
        description: 'View statistics on your productivity, including total work time and number of intervals.',
        icon: 'bar-chart'
      },
      {
        title: 'Dark Mode',
        description: 'Switch to dark mode for a better viewing experience in low-light conditions.',
        icon: 'moon'
      },
      {
        title: 'Widget Support',
        description: 'Add a timer widget to your home screen for quick access.',
        icon: 'layout'
      },
    ];
  } else if (appNameLower.includes('fitness') || appNameLower.includes('workout')) {
    return [
      {
        title: 'Workout Tracking',
        description: 'Track your exercises, sets, and reps for each workout session.',
        icon: 'activity'
      },
      {
        title: 'Progress Charts',
        description: 'Visualize your fitness progress over time with detailed charts.',
        icon: 'trending-up'
      },
      {
        title: 'Custom Workouts',
        description: 'Create and save custom workout routines tailored to your goals.',
        icon: 'list'
      },
      {
        title: 'Workout Timer',
        description: 'Built-in timer for tracking rest periods and HIIT intervals.',
        icon: 'clock'
      },
      {
        title: 'Goal Setting',
        description: 'Set and track fitness goals to stay motivated and on track.',
        icon: 'target'
      },
      {
        title: 'Calendar View',
        description: 'See your workout history and schedule future sessions.',
        icon: 'calendar'
      },
      {
        title: 'Exercise Library',
        description: 'Browse a comprehensive library of exercises with instructions.',
        icon: 'book'
      },
      {
        title: 'Health Integration',
        description: 'Sync with health services for comprehensive fitness tracking.',
        icon: 'heart'
      },
    ];
  } else {
    // Default features
    return [
      {
        title: 'User Authentication',
        description: 'Secure login and account management with email and social sign-in options.',
        icon: 'user'
      },
      {
        title: 'Real-time Sync',
        description: 'Automatically sync your data across all your devices in real-time.',
        icon: 'refresh-cw'
      },
      {
        title: 'Offline Mode',
        description: 'Access and use the app even when you have no internet connection.',
        icon: 'wifi-off'
      },
      {
        title: 'Push Notifications',
        description: 'Stay informed with timely and relevant push notifications.',
        icon: 'bell'
      },
      {
        title: 'Cloud Storage',
        description: 'Securely store and access your data from the cloud anytime.',
        icon: 'cloud'
      },
      {
        title: 'Dark Mode',
        description: 'Switch between light and dark themes based on your preference.',
        icon: 'moon'
      },
      {
        title: 'Data Visualization',
        description: 'View your data in beautiful charts and interactive graphs.',
        icon: 'bar-chart-2'
      },
      {
        title: 'Customization',
        description: 'Personalize the app to match your preferences and workflows.',
        icon: 'settings'
      },
    ];
  }
};
