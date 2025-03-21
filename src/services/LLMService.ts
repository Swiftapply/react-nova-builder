
import { useState } from 'react';

// Gemini API response types
export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
      role: string;
    };
    finishReason: string;
    index: number;
  }[];
  promptFeedback?: {
    blockReason?: string;
    safetyRatings?: any[];
  };
}

export type LLMModelType = 
  | 'gemini-2.0-flash-001' 
  | 'gemini-pro-vision' 
  | 'gemini-ultra'
  | 'mistral-codestral-2501';

// Updated model definitions with Gemini and Mistral models
export const llmModels = [
  {
    id: 'mistral-codestral-2501' as LLMModelType,
    name: 'Mistral Codestral 2501',
    provider: 'Mistral',
    description: 'Specialized code generation model with advanced reasoning capabilities',
    apiVersion: 'v1'
  },
  {
    id: 'gemini-2.0-flash-001' as LLMModelType,
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    description: 'Google\'s advanced model with strong reasoning and coding abilities',
    apiVersion: 'v1'
  },
  {
    id: 'gemini-pro-vision' as LLMModelType,
    name: 'Gemini Pro Vision',
    provider: 'Google',
    description: 'Multimodal model that can understand images and text',
    apiVersion: 'v1beta'
  },
  {
    id: 'gemini-ultra' as LLMModelType,
    name: 'Gemini Ultra',
    provider: 'Google',
    description: 'Google\'s most capable model for highly complex tasks',
    apiVersion: 'v1beta'
  }
];


// Import the Google Generative AI library
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Function to call Google's Gemini API using the official client library
export const callGeminiAPI = async (
  messages: Array<{ role: string; content: string }>,
  modelId: string
): Promise<any> => {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  // Initialize the Google Generative AI with the API key
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  
  // Format the model name correctly for the API version
  // For v1, the model name should include the full path like 'models/gemini-2.0-flash-001'
  const modelName = modelId.startsWith('gemini-2.0') ? modelId : `models/${modelId}`;
  
  // Get the model
  const model = genAI.getGenerativeModel({ model: modelName });
  
  // Convert chat messages to Gemini format
  // For chat history, we need to use the chat method
  const chat = model.startChat({
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2000,
      topP: 0.95,
      topK: 40
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  });

  try {
    // Process messages to handle system messages (convert to user messages as Gemini doesn't support system role)
    const processedMessages = messages.map(msg => ({
      role: msg.role === 'system' ? 'user' : msg.role,
      parts: [{ text: msg.content }]
    }));
    
    // Send all messages to the chat
    let result;
    for (const msg of processedMessages) {
      result = await chat.sendMessage(msg.parts[0].text);
    }
    
    // Format the response to match our expected GeminiResponse type
    return {
      candidates: [
        {
          content: {
            parts: [
              { text: result.response.text() }
            ],
            role: 'model'
          },
          finishReason: 'STOP',
          index: 0
        }
      ]
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error(`Gemini API error: ${error.message}`);
  }
};

// Function to call Mistral API
export const callMistralAPI = async (
  messages: Array<{ role: string; content: string }>,
  modelId: string
): Promise<any> => {
  // Hard-coded Mistral API key
  const MISTRAL_API_KEY = 'bFqVXB13fwyBboxV6juvioAK1hZBUIuv';
  
  if (!MISTRAL_API_KEY) {
    throw new Error('Mistral API key is not configured');
  }

  try {
    console.log(`Calling Mistral API with model: ${modelId}`);
    
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      },
      body: JSON.stringify({
        model: modelId,
        messages: messages.map(msg => ({
          role: msg.role === 'system' ? 'assistant' : msg.role,
          content: msg.content
        })),
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Mistral API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling Mistral API:', error);
    throw new Error(`Mistral API error: ${error.message}`);
  }
};

// Function to maintain compatibility with existing code that uses OpenRouter format
export const callOpenRouter = async (
  messages: Array<{ role: string; content: string }>,
  modelId: string
): Promise<any> => {
  // Determine which API to call based on the model ID
  if (modelId.startsWith('mistral')) {
    const mistralResponse = await callMistralAPI(messages, modelId);
    
    // Convert Mistral response to OpenRouter format for compatibility
    return {
      id: 'mistral-response-' + Date.now(),
      choices: [{
        message: {
          content: mistralResponse.choices?.[0]?.message?.content || '',
          role: 'assistant'
        },
        index: 0,
        finish_reason: mistralResponse.choices?.[0]?.finish_reason || 'stop'
      }],
      model: modelId
    };
  } else {
    // Call Gemini API for Google models
    const geminiResponse = await callGeminiAPI(messages, modelId);
    
    // Convert Gemini response to OpenRouter format for compatibility
    return {
      id: 'gemini-response-' + Date.now(),
      choices: [{
        message: {
          content: geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text || '',
          role: 'assistant'
        },
        index: 0,
        finish_reason: geminiResponse.candidates?.[0]?.finishReason || 'stop'
      }],
      model: modelId
    };
  }
};

// Hook to manage the selected LLM model
export const useLLMModel = () => {
  const [selectedModel, setSelectedModel] = useState<LLMModelType>('mistral-codestral-2501');

  const selectModel = (modelId: LLMModelType) => {
    setSelectedModel(modelId);
  };

  const currentModel = llmModels.find(model => model.id === selectedModel) || llmModels[0];

  return {
    models: llmModels,
    selectedModel,
    currentModel,
    selectModel
  };
};
