
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MobilePreview from '@/components/MobilePreview';
import FeatureShowcase from '@/components/FeatureShowcase';
import CodeExplorer from '@/components/CodeExplorer';
import { useAIService, GeneratedAppData } from '@/services/AIService';
import ErrorBoundary from '@/components/ErrorBoundary';

interface LocationState {
  prompt?: string;
}

const Builder = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const [showPreview, setShowPreview] = useState(true);
  const [currentTab, setCurrentTab] = useState<'preview' | 'code'>('preview');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'system'; content: string }>>([]);
  const { isLoading, setIsLoading, error, generatedApp, generateApp, updateAppProgress, setGeneratedApp } = useAIService();

  // Log state changes for debugging
  useEffect(() => {
    console.log('Messages state updated:', messages);
  }, [messages]);

  useEffect(() => {
    console.log('Loading state changed:', isLoading);
  }, [isLoading]);

  // Track if initialization has been done
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Update document title
    document.title = "WingPilot - App Builder";
    
    // Initialize with the prompt if provided and not already initialized
    if (state?.prompt && !initialized) {
      console.log('Initializing with prompt:', state.prompt);
      setInitialized(true); // Mark as initialized to prevent repeated calls
      setMessages([{ role: 'user', content: state.prompt }]);
      
      // Generate app based on prompt
      generateApp(state.prompt).then((appData) => {
        console.log('App generated successfully:', appData.appName);
        setMessages(prev => {
          console.log('Updating messages with system response');
          return [
            ...prev,
            { 
              role: 'system', 
              content: `I'll help you build a fully functional ${appData.appName} app. Here's my development plan:

1. **App Concept & Requirements Analysis**
   - Core features: ${(appData.features || []).map(feature => 
       `\n   - ${typeof feature === 'object' && feature !== null ? feature.name || JSON.stringify(feature || {}) : (feature || '')}`
     ).join('')}
   - Target users: ${appData.description.includes('for') ? appData.description.split('for')[1].trim() : 'Mobile app users'}

2. **Technical Architecture**
   - React Native with Expo for cross-platform development
   - State management with React Context API and hooks
   - Navigation using React Navigation
   - Data persistence with AsyncStorage or Firebase

3. **UI/UX Design**
   - Modern, clean interface with intuitive navigation
   - Responsive layouts for different screen sizes
   - Consistent styling with a custom theme

4. **Implementation Plan**
   - Set up project structure and dependencies
   - Create core components and screens
   - Implement business logic and data flow
   - Add navigation and user interactions
   - Test and refine the implementation

Let's start by setting up the project structure and implementing the core features. What specific aspect would you like me to focus on first?` 
            }
          ];
        });
      }).catch(err => {
        console.error('Error generating app:', err);
        setMessages(prev => [
          ...prev,
          { 
            role: 'system', 
            content: `I'm sorry, I encountered an error while generating your app: ${err.message}` 
          }
        ]);
      });
    }
  }, [state?.prompt, generateApp, initialized]);

  // Update the handleMessageSent function to use real AI responses
  const handleMessageSent = useCallback((text: string) => {
    console.log('New user message received:', text);
    
    // Add user message
    setMessages(prev => {
      console.log('Adding user message to state');
      return [...prev, { role: 'user', content: text }];
    });
    
    // Set loading state
    setIsLoading(true);
    
    // If we have a generated app, use it to provide context
    if (generatedApp) {
      // Prepare messages for the AI
      const aiMessages = [
        { 
          role: "system", 
          content: `You are WingPilot, an AI assistant that helps users build mobile apps. The user is building an app called "${generatedApp.appName}" with the description: "${generatedApp.description}". The app has these features: ${generatedApp.features ? generatedApp.features.join(", ") : "No features specified yet"}. Provide helpful, concise responses to their questions about app development.` 
        },
        ...messages.map(m => ({ role: m.role === 'system' ? 'assistant' : m.role, content: m.content })),
        { role: "user", content: text }
      ];
      
      // Call Gemini API
      import('@/services/LLMService').then(({ callOpenRouter, useLLMModel }) => {
        const { currentModel } = useLLMModel();
        callOpenRouter(aiMessages, currentModel.id)
          .then(response => {
            const aiResponse = response.choices[0].message.content;
            
            // Add AI response to messages
            setMessages(prev => [
              ...prev,
              { role: 'system', content: aiResponse }
            ]);
            
            setIsLoading(false);
          })
          .catch(err => {
            console.error('Error getting AI response:', err);
            setMessages(prev => [
              ...prev,
              { role: 'system', content: `I'm sorry, I encountered an error: ${err.message}` }
            ]);
            setIsLoading(false);
          });
      });
    } else {
      // If no app is generated yet, use the message to generate one
      generateApp(text)
        .then(appData => {
          console.log('App generated successfully:', appData.appName);
          setMessages(prev => {
            return [
              ...prev,
              { 
                role: 'system', 
                content: `I'll help you build a ${appData.appName}. Let me first analyze what features we'll need and create a roadmap for development. I'll start by setting up the basic structure with React Native and Expo.\n\nHere are the key features I'll implement:\n${appData.features ? appData.features.map(feature => 
                  `- ${typeof feature === 'object' && feature !== null ? feature.name || JSON.stringify(feature || {}) : (feature || '')}`
                ).join('\n') : "Let's define some features!"}` 
              }
            ];
          });
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Error generating app:', err);
          setMessages(prev => [
            ...prev,
            { 
              role: 'system', 
              content: `I'm sorry, I encountered an error while generating your app: ${err.message}` 
            }
          ]);
          setIsLoading(false);
        });
    }
  }, [messages, generateApp, generatedApp]);

  // Add a function to continue app generation
  const handleContinueGeneration = useCallback(() => {
    if (!generatedApp) return;
    
    setIsLoading(true);
    updateAppProgress()
      .then(updatedApp => {
        if (!updatedApp) return;
        
        const currentStep = updatedApp.steps[updatedApp.currentStep - 1];
        const nextStep = updatedApp.steps[updatedApp.currentStep];
        
        setMessages(prev => [
          ...prev,
          { 
            role: 'system', 
            content: `I've completed the "${currentStep.title}" step. ${currentStep.output || ''}\n\nNow I'm working on "${nextStep?.title || 'finalizing your app'}"...` 
          }
        ]);
        
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error updating app progress:', err);
        setMessages(prev => [
          ...prev,
          { 
            role: 'system', 
            content: `I'm sorry, I encountered an error while updating your app progress: ${err.message}` 
          }
        ]);
        setIsLoading(false);
      });
  }, [generatedApp, updateAppProgress]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <div className="flex-1 flex pt-14">
        {/* Left sidebar with chat */}
        <div className="w-full md:w-1/2 lg:w-2/5 h-[calc(100vh-56px)] border-r border-white/5">
          <Sidebar 
            messages={messages}
            isLoading={isLoading}
            onMessageSent={handleMessageSent} 
          />
        </div>
        
        {/* Right panel with preview/code */}
        <div className="hidden md:block md:w-1/2 lg:w-3/5 h-[calc(100vh-56px)]">
          <div className="flex items-center border-b border-white/5">
            <button 
              onClick={() => setCurrentTab('code')}
              className={`px-4 py-2 text-sm ${currentTab === 'code' ? 'bg-white/5 text-white' : 'text-white/60'}`}
            >
              Code
            </button>
            <button 
              onClick={() => setCurrentTab('preview')}
              className={`px-4 py-2 text-sm ${currentTab === 'preview' ? 'bg-white/5 text-white' : 'text-white/60'}`}
            >
              Preview
            </button>
          </div>
          
          <div className="h-[calc(100%-41px)] overflow-auto">
            {currentTab === 'preview' ? (
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <MobilePreview 
                    previewCode={generatedApp?.previewCode}
                    qrCodeUrl={generatedApp?.qrCodeUrl}
                  />
                </div>
                {generatedApp?.features && generatedApp.features.length > 0 && (
                  <div className="border-t border-white/5 mt-4">
                    <ErrorBoundary fallback={<div className="p-4">Unable to display features</div>}>
                      <FeatureShowcase 
                        features={generatedApp.features} 
                        appName={generatedApp.appName}
                        onFeatureClick={(feature) => {
                          // Add feature to the chat as a suggestion
                          if (typeof feature === 'string') {
                            handleMessageSent(`Can you tell me more about the ${feature} feature?`);
                          }
                        }}
                      />
                    </ErrorBoundary>
                  </div>
                )}
              </div>
            ) : (
              <CodeExplorer 
                generatedApp={generatedApp}
                onCodeChange={(newCode) => {
                  if (generatedApp) {
                    const updatedApp = { 
                      ...generatedApp, 
                      previewCode: newCode 
                    };
                    setGeneratedApp(updatedApp);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
