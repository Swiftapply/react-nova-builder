
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { callOpenRouter, useLLMModel } from '@/services/LLMService';

interface ProjectFile {
  path: string;
  content: string;
}

interface AppConcept {
  appName: string;
  description: string;
  features: string[];
}

export const createProjectFiles = async (
  appName: string, 
  previewCode: string,
  features: string[]
): Promise<string> => {
  const files: ProjectFile[] = [];
  
  // Parse the preview code to extract components and functionality
  const mainAppCode = previewCode;
  
  // Create App.js
  files.push({
    path: 'App.js',
    content: mainAppCode
  });
  
  // Create package.json
  files.push({
    path: 'package.json',
    content: JSON.stringify({
      name: appName.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      main: 'node_modules/expo/AppEntry.js',
      scripts: {
        start: 'expo start',
        android: 'expo start --android',
        ios: 'expo start --ios',
        web: 'expo start --web'
      },
      dependencies: {
        'expo': '^48.0.0',
        'expo-status-bar': '~1.4.4',
        'react': '18.2.0',
        'react-native': '0.71.8',
        '@react-navigation/native': '^6.1.6',
        '@react-navigation/native-stack': '^6.9.12',
        'react-native-safe-area-context': '^4.5.3',
        'react-native-screens': '^3.20.0',
        'react-native-gesture-handler': '^2.10.1'
      },
      devDependencies: {
        '@babel/core': '^7.20.0'
      },
      private: true
    }, null, 2)
  });
  
  // Create app.json for Expo
  files.push({
    path: 'app.json',
    content: JSON.stringify({
      expo: {
        name: appName,
        slug: appName.toLowerCase().replace(/\s+/g, '-'),
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'light',
        splash: {
          image: './assets/splash.png',
          resizeMode: 'contain',
          backgroundColor: '#ffffff'
        },
        assetBundlePatterns: [
          '**/*'
        ],
        ios: {
          supportsTablet: true
        },
        android: {
          adaptiveIcon: {
            foregroundImage: './assets/adaptive-icon.png',
            backgroundColor: '#ffffff'
          }
        },
        web: {
          favicon: './assets/favicon.png'
        }
      }
    }, null, 2)
  });
  
  // Create README.md
  const appDescription = "A mobile application built with React Native";
  files.push({
    path: 'README.md',
    content: `# ${appName}

${appDescription}

## Features

${features.map(feature => `- ${feature}`).join('\n')}

## Getting Started

1. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`
   npm start
   \`\`\`

3. Scan the QR code with the Expo Go app on your phone or use an emulator.
`
  });
  
  // Create a ZIP file with all the project files
  const zip = new JSZip();
  
  files.forEach(file => {
    zip.file(file.path, file.content);
  });
  
  // Create assets folder with placeholder images
  const assetsFolder = zip.folder('assets');
  // You would add placeholder images here
  
  // Generate the ZIP file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  
  // Create a download URL
  const downloadUrl = URL.createObjectURL(zipBlob);
  
  return downloadUrl;
};

// Function to download the project
export const downloadProject = async (
  appName: string, 
  previewCode: string,
  features: string[]
) => {
  const zipUrl = await createProjectFiles(appName, previewCode, features);
  saveAs(zipUrl, `${appName.toLowerCase().replace(/\s+/g, '-')}.zip`);
};

// Helper function to generate app concept
const generateAppConcept = async (prompt: string): Promise<AppConcept> => {
  const { currentModel } = useLLMModel();
  
  const messages = [
    {
      role: "system",
      content: `You are an expert mobile app developer. Create a detailed app concept based on the user's prompt.
      
      Your response should be in JSON format with these keys:
      - appName: A catchy, relevant name for the app
      - description: 1-2 sentence description of what the app does
      - features: Array of strings listing 3-7 core features the app should have`
    },
    {
      role: "user",
      content: prompt
    }
  ];

  try {
    const response = await callOpenRouter(messages, currentModel.id);
    const content = response?.choices?.[0]?.message?.content || '';
    
    // Try to extract JSON from the response
    try {
      const jsonMatch = content.match(/```json([\s\S]*?)```/) || content.match(/({[\s\S]*})/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1].trim());
      } else {
        return JSON.parse(content);
      }
    } catch (error) {
      // If parsing fails, create a basic structure
      console.error('Error parsing app concept:', error);
      return {
        appName: prompt.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'App',
        description: `A mobile app based on "${prompt}"`,
        features: ['User authentication', 'Data storage', 'Notifications']
      };
    }
  } catch (error) {
    console.error('Error generating app concept:', error);
    // Create a fallback response
    return {
      appName: prompt.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'App',
      description: `A mobile app based on "${prompt}"`,
      features: ['User authentication', 'Data storage', 'Notifications']
    };
  }
};

// Helper function to generate app files
const generateAppFiles = async (appConcept: AppConcept, enhancedFeatures: any[]): Promise<any[]> => {
  // This would be implemented to generate app files based on the concept
  return [];
};

// Generate QR code for app preview
const generateQRCode = async (appName: string): Promise<string> => {
  // This would generate a QR code for app preview
  // For now, we'll return a placeholder URL
  return `https://example.com/preview/${appName.toLowerCase().replace(/\s+/g, '-')}`;
};

// Enhance the generateApp function to create a complete, functional app
export const generateApp = async (prompt: string): Promise<any> => {
  try {
    // First, generate the app concept with detailed feature specifications
    const appConcept = await generateAppConcept(prompt);
    
    // Generate detailed implementation for each feature
    const enhancedFeatures = await Promise.all(
      appConcept.features.map(async (feature: string) => {
        const featureImplementation = await generateFeatureImplementation(feature, appConcept.appName);
        return {
          name: feature,
          implementation: featureImplementation,
          components: featureImplementation.components || [],
          screens: featureImplementation.screens || [],
          services: featureImplementation.services || []
        };
      })
    );
    
    // Generate the complete app structure with all necessary files
    const files = await generateAppFiles(appConcept, enhancedFeatures);
    
    // Generate the preview code that shows the actual implementation
    const previewCode = await generateCompleteAppCode(appConcept, enhancedFeatures);
    
    return {
      ...appConcept,
      enhancedFeatures,
      files,
      previewCode,
      qrCodeUrl: await generateQRCode(appConcept.appName)
    };
  } catch (error) {
    console.error('Error generating app:', error);
    throw error;
  }
};

// New function to generate detailed implementation for each feature
const generateFeatureImplementation = async (feature: string, appName: string): Promise<any> => {
  const { currentModel } = useLLMModel();
  
  const messages = [
    {
      role: "system",
      content: `You are an expert React Native developer. Create a detailed implementation plan for the "${feature}" feature in a ${appName} app. 
      
Include:
1. Required components with full code implementation
2. Screen designs and layouts
3. State management approach
4. API/data handling
5. User interactions and event handling

Your response should be in JSON format with these keys:
- description: Detailed description of the feature
- components: Array of component implementations (each with name, code, and purpose)
- screens: Array of screen implementations (each with name, code, and purpose)
- services: Array of service implementations for data handling
- stateManagement: Implementation of state management for this feature
- dependencies: Required libraries and dependencies`
    },
    {
      role: "user",
      content: `Create a detailed implementation plan for the "${feature}" feature in my ${appName} app.`
    }
  ];

  try {
    const response = await callOpenRouter(messages, currentModel.id);
    
    // Extract JSON from the response
    const content = response?.choices?.[0]?.message?.content || '';
    const jsonMatch = content.match(/```json([\s\S]*?)```/) || content.match(/({[\s\S]*})/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1].trim());
    } else {
      // Attempt to parse the entire content as JSON
      return JSON.parse(content);
    }
  } catch (error) {
    console.error('Error parsing feature implementation:', error);
    // Return a basic structure if parsing fails
    return {
      description: `Implementation of ${feature}`,
      components: [],
      screens: [],
      services: [],
      stateManagement: "",
      dependencies: []
    };
  }
};

// New function to generate complete app code with all features implemented
const generateCompleteAppCode = async (appConcept: AppConcept, enhancedFeatures: any[]): Promise<string> => {
  const { currentModel } = useLLMModel();
  
  const featureSummaries = enhancedFeatures.map(f => 
    `- ${f.name}: ${f.description?.substring(0, 100)}...`
  ).join('\n');
  
  const componentsList = enhancedFeatures.flatMap(f => 
    f.components?.map(c => `- ${c.name}: ${c.purpose?.substring(0, 50)}...`) || []
  ).join('\n');
  
  const screensList = enhancedFeatures.flatMap(f => 
    f.screens?.map(s => `- ${s.name}: ${s.purpose?.substring(0, 50)}...`) || []
  ).join('\n');

  const messages = [
    {
      role: "system",
      content: `You are an expert React Native developer. Create a complete, functional React Native app for ${appConcept.appName}.

The app has these features:
${featureSummaries}

Components to implement:
${componentsList}

Screens to implement:
${screensList}

Your task is to create a SINGLE App.js file that implements ALL these features with REAL FUNCTIONALITY.
Include:
1. All necessary imports
2. Navigation setup with React Navigation
3. State management with Context API or Redux
4. All screens and components
5. Data handling with mock data or AsyncStorage
6. Complete styling

The code must be fully functional and ready to run in an Expo project.
DO NOT use placeholders or comments like "// implement this later".
IMPLEMENT EVERYTHING with real, working code.`
    },
    {
      role: "user",
      content: `Create a complete, functional React Native app for ${appConcept.appName} with all the features listed.`
    }
  ];

  try {
    const response = await callOpenRouter(messages, currentModel.id);
    
    // Extract code from the response
    const content = response?.choices?.[0]?.message?.content || '';
    const codeMatch = content.match(/```(?:jsx|javascript|js|tsx|ts)([\s\S]*?)```/);
    
    if (codeMatch) {
      return codeMatch[1].trim();
    } else {
      // If no code block is found, use the entire content
      return content;
    }
  } catch (error) {
    console.error('Error generating complete app code:', error);
    return `
// Sample React Native App for ${appConcept.appName}
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>${appConcept.appName}</Text>
      <Text style={styles.description}>${appConcept.description}</Text>
      <Text style={styles.subtitle}>Features:</Text>
      ${appConcept.features.map(f => `<Text style={styles.feature}>${f}</Text>`).join('\n      ')}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  feature: {
    fontSize: 14,
    marginBottom: 5,
  },
});
`;
  }
};
