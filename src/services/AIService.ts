
import { useState } from 'react';
import { LLMModelType, useLLMModel, callOpenRouter } from './LLMService';
import { parseReactNativeCode, generateDemoFeatures } from './CodeParserService';

// Types for AI service responses
export interface AIResponse {
  content: string;
  type: 'text' | 'code' | 'error';
  language?: string;
}

export interface AppGenerationStep {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  output?: string;
}

export interface GeneratedAppData {
  appName: string;
  description: string;
  features: string[];
  steps: AppGenerationStep[];
  currentStep: number;
  qrCodeUrl?: string;
  previewCode?: string;
  currentModel?: { id: string; name: string; provider: string };
}

// Enhance the app generation steps to include more detailed implementation phases
const appGenerationSteps: AppGenerationStep[] = [
  {
    title: 'App Concept',
    description: 'Defining the app concept, core features, and user stories',
    status: 'pending'
  },
  {
    title: 'Architecture Planning',
    description: 'Planning the app architecture, technology stack, and data models',
    status: 'pending'
  },
  {
    title: 'UI Components',
    description: 'Designing modern UI components with proper styling and interactions',
    status: 'pending'
  },
  {
    title: 'Core Functionality',
    description: 'Implementing core features with state management and data handling',
    status: 'pending'
  },
  {
    title: 'Navigation & Routing',
    description: 'Setting up navigation flow between screens with proper routing',
    status: 'pending'
  },
  {
    title: 'Testing & Refinement',
    description: 'Testing the app functionality and refining the implementation',
    status: 'pending'
  }
];

// Hook for AI service functionality
export const useAIService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedApp, setGeneratedApp] = useState<GeneratedAppData | null>(null);
  const { selectedModel, currentModel } = useLLMModel();

  // Function to generate app based on user prompt
  const generateApp = async (prompt: string): Promise<GeneratedAppData> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Enhanced system prompt to generate more complete app concept
      const messages = [
        { 
          role: "system", 
          content: "You are WingPilot, an AI assistant that helps users build mobile apps. Generate a detailed app concept based on the user's prompt. Include: 1) A catchy app name, 2) A concise description, 3) A list of 4-6 key features that can be FULLY IMPLEMENTED with React Native. Focus on features that provide real functionality, not just UI elements. Format your response as JSON with fields: appName, description, features (array)." 
        },
        { role: "user", content: prompt }
      ];
      
      console.log(`Using ${currentModel.name} by ${currentModel.provider} to generate app`);
      
      // Make API call to Gemini API
      const response = await callOpenRouter(messages, currentModel.id);
      
      // Check if response has the expected structure
      if (!response || !response.choices || response.choices.length === 0) {
        throw new Error("API response is missing expected data structure");
      }
      
      // Parse the response to extract app concept
      const responseContent = response.choices[0].message.content;
      let appConcept;
      
      try {
        // Try to parse JSON directly
        appConcept = JSON.parse(responseContent);
      } catch (e) {
        // If not valid JSON, try to extract JSON from the text
        const jsonMatch = responseContent.match(/```json\n([\s\S]*?)\n```/) || 
                         responseContent.match(/{[\s\S]*}/);
        
        if (jsonMatch) {
          try {
            appConcept = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          } catch (e2) {
            throw new Error("Failed to parse AI response as JSON");
          }
        } else {
          throw new Error("AI response did not contain valid JSON");
        }
      }
      
      // Generate a unique Expo project ID for the QR code
      const appName = appConcept.appName || generateAppName(prompt);
      const expoProjectId = generateExpoProjectId(appName);
      const expoQRCodeUrl = `https://expo.dev/@wingpilot/${expoProjectId}`;
      
      // Initialize app data with first step in progress
      const initialSteps = [...appGenerationSteps];
      initialSteps[0].status = 'completed';
      initialSteps[1].status = 'in-progress';
      
      // Ensure features are always strings in the app data
      const appData: GeneratedAppData = {
        appName: appConcept.appName || appName,
        description: appConcept.description || `A mobile app that ${prompt.toLowerCase().includes('app that') ? prompt.split('app that')[1].trim() : prompt}`,
        features: Array.isArray(appConcept.features) 
          ? appConcept.features.map(f => {
              if (typeof f === 'string') return f;
              if (f === null || f === undefined) return 'Enhanced user experience';
              // Handle object features by extracting name or description, or stringify properly
              if (typeof f === 'object') {
                return f.name || f.description || f.title || JSON.stringify(f).replace(/[{}"]/g, '');
              }
              return String(f);
            }) 
          : generateFeatures(prompt, selectedModel),
        steps: initialSteps,
        currentStep: 1, // Architecture Planning is in progress
        qrCodeUrl: expoQRCodeUrl,
        previewCode: await generatePreviewCode(prompt, appConcept),
        currentModel: currentModel
      };
      
      setGeneratedApp(appData);
      return appData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update app generation progress
  const updateAppProgress = async (): Promise<GeneratedAppData | null> => {
    if (!generatedApp) return null;
    
    try {
      setIsLoading(true);
      
      // Get current step index
      const currentStepIndex = generatedApp.currentStep;
      if (currentStepIndex >= generatedApp.steps.length) {
        return generatedApp; // All steps completed
      }
      
      // Create a copy of the app data to update
      const updatedApp = { ...generatedApp };
      updatedApp.steps[currentStepIndex].status = 'in-progress';
      
      // Prepare messages for the current step with more detailed instructions
      const messages = [
        { 
          role: "system", 
          content: `You are WingPilot, an expert mobile app developer who creates production-ready React Native applications.

The user is building an app called "${updatedApp.appName}" with the description: "${updatedApp.description}". 
The app has these features: ${updatedApp.features.join(", ")}. 

You are now working on the step: "${updatedApp.steps[currentStepIndex].title}" - ${updatedApp.steps[currentStepIndex].description}.

Your task is to generate a complete, fully functional React Native code file (or screen component) that implements part of this app functionality. The code should:

1. Be complete and ready to run in an Expo project
2. Include all necessary imports
3. Implement real functionality, not just UI mockups
4. Use modern React Native patterns and components
5. Include explanatory comments
6. Handle basic error cases
7. Use proper TypeScript types

Format your response as a single continuous code file wrapped in markdown code blocks.` 
        },
        { role: "user", content: `Generate complete React Native code for a screen or component for my ${updatedApp.appName} app, focusing on ${updatedApp.steps[currentStepIndex].title} functionality.` }
      ];
      
      // Make API call
      const response = await callOpenRouter(messages, currentModel.id);
      
      // Check if response has the expected structure
      if (!response || !response.choices || response.choices.length === 0) {
        throw new Error("API response is missing expected data structure");
      }
      
      // Extract code from the response
      const responseText = response.choices[0].message.content;
      const codeMatch = responseText.match(/```(?:jsx|js|tsx|ts)?([\s\S]*?)```/);
      
      // Update the step with the response content and code
      updatedApp.steps[currentStepIndex].output = responseText;
      updatedApp.steps[currentStepIndex].status = 'completed';
      
      // Update preview code if valid code was generated
      if (codeMatch) {
        const extractedCode = codeMatch[1].trim();
        if (extractedCode.length > 200) {
          updatedApp.previewCode = extractedCode;
        }
      }
      
      // Move to the next step if not the last one
      if (currentStepIndex < updatedApp.steps.length - 1) {
        updatedApp.currentStep = currentStepIndex + 1;
        updatedApp.steps[currentStepIndex + 1].status = 'in-progress';
      }
      
      // If we've completed all steps, generate updated preview code
      if (currentStepIndex === updatedApp.steps.length - 1) {
        updatedApp.previewCode = await generateUpdatedPreviewCode(updatedApp);
      }
      
      setGeneratedApp(updatedApp);
      return updatedApp;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return generatedApp;
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to generate a mock app name based on the prompt
  const generateAppName = (prompt: string): string => {
    const words = prompt.split(' ');
    const nameWords = words.filter(word => word.length > 3).slice(0, 2);
    
    if (nameWords.length === 0) {
      return "WingApp";
    }
    
    return nameWords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  };

  // Helper function to generate features based on the prompt
  const generateFeatures = (prompt: string, modelType: LLMModelType): string[] => {
    // Fallback features if AI generation fails
    return [
      "User authentication and profiles",
      "Data synchronization across devices",
      "Push notifications",
      "Offline mode support",
      "Social sharing integration"
    ];
  };

  // Generate preview code based on the app concept
  const generatePreviewCode = async (prompt: string, appConcept: any): Promise<string> => {
    try {
      const messages = [
        { 
          role: "system", 
          content: `You are WingPilot, an elite mobile app developer who creates production-ready React Native applications.
        
Your task is to generate a FULLY FUNCTIONAL React Native app based on the user's prompt.

Follow these guidelines:
1. Create a complete, working app with real functionality - not just UI mockups
2. Implement all core features with proper state management (using React hooks)
3. Include navigation setup with React Navigation
4. Add realistic data handling (local storage or mock API calls)
5. Implement proper user interactions and form handling
6. Use modern UI components and styling (React Native Paper or similar libraries)
7. Structure the code with proper separation of concerns (components, screens, services)
8. Include comments explaining complex logic

The code must be complete enough to be immediately usable in an Expo project.
Include ALL necessary imports, component definitions, and styling.

Your response MUST be ONLY the code wrapped in triple backticks with the language specified as jsx.`
        },
        { 
          role: "user", 
          content: `Create a fully functional React Native app for: ${prompt}
        
App name: ${appConcept.appName || 'MyApp'}
Description: ${appConcept.description || prompt}
Features: ${Array.isArray(appConcept.features) ? appConcept.features.map(f => typeof f === 'object' ? JSON.stringify(f) : f).join(', ') : 'Modern UI, User authentication, Data management'}

Make it fully functional with proper navigation, state management, and data handling. Use modern UI components and styling.` 
        }
      ];
      
      const response = await callOpenRouter(messages, currentModel.id);
      
      // Extract code from the response
      const responseText = response?.choices?.[0]?.message?.content || '';
      const codeMatch = responseText.match(/```(?:jsx|javascript|js|tsx|ts)([\s\S]*?)```/);
      
      if (!codeMatch) {
        console.warn("No code block found in the response. Using fallback code.");
        return generateFallbackCode(appConcept);
      }
      
      // Extract the code from the match and ensure it's substantial
      const extractedCode = codeMatch[1].trim();
      if (extractedCode.length < 500) {  // Increased minimum length for functional code
        console.warn("Generated code is too short. Using fallback code.");
        return generateFallbackCode(appConcept);
      }
      
      return extractedCode;
    } catch (err) {
      console.error('Error generating preview code:', err);
      return generateFallbackCode(appConcept);
    }
  };

  // Generate updated preview code based on the current app state
  const generateUpdatedPreviewCode = async (appData: GeneratedAppData): Promise<string> => {
    try {
      const messages = [
        { 
          role: "system", 
          content: `You are WingPilot, an elite mobile app designer and React Native developer who creates stunning, modern mobile experiences. Your designs follow 2024 UI/UX trends, taking inspiration from top-tier apps like Stripe, Linear, Arc Browser, and modern fintech/lifestyle apps.

Your task is to generate production-quality code for a cross-platform mobile app called "${appData.appName}" with the description: "${appData.description}". The app has these features: ${appData.features.join(", ")}.

Design Requirements:
1. Modern Minimalist Aesthetic:
   - Clean, uncluttered layouts with purposeful whitespace
   - Subtle, smooth micro-interactions and transitions
   - Modern neutral color palette (think Stripe, Linear)
   - Thoughtful use of blur effects and translucency
   - Elegant typography with perfect hierarchy
   - Generous padding and consistent spacing (16-24px between major elements)

2. 2024 UI Elements:
   - Large, bold headlines (20-24px) with modern variable sans-serif fonts
   - Pill-shaped buttons with 12-16px padding and 12-16px border radius
   - Floating action buttons with layered shadows and subtle glow effects
   - Card layouts with glass effects, subtle borders (1px, 5-10% opacity) and generous rounded corners (16-24px)
   - Bottom sheet modals with spring animations and backdrop blur
   - Skeleton loading with shimmer effects and staggered animations
   - Pull-to-refresh with physics-based animations and haptic feedback
   - Rich interactive states with scale transforms and color transitions

3. Technical Requirements:
   - Use React Native Paper for UI components
   - Set up React Navigation v6 with native stack 
   - Use React Native Reanimated 3 for fluid animations
   - Use React Native Linear Gradient for modern gradients
   - Implement proper TypeScript types for all components and props
   - Use React Native Vector Icons (preferably Phosphor or Lucide)
   - Use SafeAreaView and modern Flexbox patterns with consistent spacing

Focus on creating a UI that feels ultra-premium, cutting-edge, and delightful to use. Create a design system with consistent spacing, typography, and color application. Use layered shadows, subtle blurs, and micro-interactions to create depth and tactility. Ensure all interactive elements have rich touch states with spring animations. The final result should feel like a polished, production-ready app.

Your response MUST be ONLY the code wrapped in triple backticks with the language specified as jsx. Do not include any explanations or text outside the code block.` 
        },
        { role: "user", content: `Generate improved React Native code for my ${appData.appName} app.` }
      ];
      
      const response = await callOpenRouter(messages, currentModel.id);
      
      // Check if response has the expected structure
      if (!response || !response.choices || response.choices.length === 0) {
        console.warn("API response is missing expected data structure. Using existing preview code.");
        return appData.previewCode || "";
      }
      
      const codeContent = response.choices[0].message.content;
      console.log('Received updated code content:', codeContent.substring(0, 100) + '...');
      
      // Extract code from markdown with improved regex pattern
      const codeMatch = codeContent.match(/```(?:jsx|tsx|javascript|typescript|js|ts)?([\s\S]*?)```/);
      
      if (!codeMatch) {
        console.warn("AI response didn't contain properly formatted code block. Using existing preview code.");
        return appData.previewCode || "";
      }
      
      // Extract the code, removing the language identifier if present
      let extractedCode = codeMatch[1].trim();
      if (extractedCode.startsWith('jsx') || extractedCode.startsWith('tsx') || 
          extractedCode.startsWith('javascript') || extractedCode.startsWith('typescript')) {
        extractedCode = extractedCode.substring(extractedCode.indexOf('\n') + 1);
      }
      
      console.log('Extracted updated code successfully, length:', extractedCode.length);
      return extractedCode;
    } catch (error) {
      console.error("Error generating updated preview code:", error);
      return appData.previewCode || "";
    }
  };

  return {
    isLoading,
    setIsLoading,
    error,
    generatedApp,
    generateApp,
    updateAppProgress,
    selectedModel,
    setGeneratedApp
  };
};

// Helper function to generate fallback code when AI response doesn't contain valid code
const generateFallbackCode = (appConcept: any): string => {
  return `
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

const ${appConcept.appName.replace(/\s+/g, '')}App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>${appConcept.appName}</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.description}>${appConcept.description}</Text>
        
        <Text style={styles.sectionTitle}>Features</Text>
        {${JSON.stringify(appConcept.features)}.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.featureText}>• {feature}</Text>
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'home' && styles.activeTab]} 
          onPress={() => setActiveTab('home')}
        >
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'search' && styles.activeTab]} 
          onPress={() => setActiveTab('search')}
        >
          <Text style={styles.tabText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]} 
          onPress={() => setActiveTab('profile')}
        >
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 15,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  featureItem: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureText: {
    fontSize: 15,
    color: '#333',
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e1e4e8',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#4a90e2',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
  },
});

export default ${appConcept.appName.replace(/\s+/g, '')}App;
`;
};

// Helper function to generate a unique Expo project ID
const generateExpoProjectId = (appName: string): string => {
  // Create a URL-friendly ID based on the app name
  const baseId = appName.toLowerCase().replace(/[^a-z0-9]/g, '');
  // Add a random suffix to ensure uniqueness
  const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${baseId}-${randomSuffix}`;
};
