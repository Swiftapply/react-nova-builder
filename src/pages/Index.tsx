
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppInput from '@/components/AppInput';
import SuggestionButton from '@/components/SuggestionButton';
import Header from '@/components/Header';

const suggestions = ["Make a visual novel game", "Make an Airbnb-style app", "Make an Instagram-style app", "Make a meditation timer", "Create a habit tracker", "Build a calorie tracker", "Create a todo list", "Design a weather dashboard", "Design a fitness tracker"];

const Index = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setLoaded(true);

    // Update document title
    document.title = "WingPilot - Build mobile apps with AI";

    // Add typing animation to title
    if (titleRef.current) {
      const title = titleRef.current;
      title.classList.add("after:content-['']", "after:border-r-2", "after:border-white", "after:animate-[blink_0.7s_infinite]");
      setTimeout(() => {
        title.classList.remove("after:content-['']", "after:border-r-2", "after:border-white", "after:animate-[blink_0.7s_infinite]");
      }, 2500);
    }
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    navigate('/builder', {
      state: {
        prompt: suggestion
      }
    });
  };

  return <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 pt-16 md:p-8">
        <div className={`max-w-4xl w-full mx-auto text-center transition-all duration-700 ease-out transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient mt-4 mx-auto py-4">
            Build any mobile app, fast.
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-16 max-w-3xl mx-auto mt-6">
            Rork builds complete, cross-platform mobile apps using AI and React Native.
          </p>
          
          <div className="mb-12 transition-all duration-500 ease-out delay-300 transform 
            opacity-0 translate-y-4 animate-[fade-in_0.5s_0.3s_forwards,slide-up_0.5s_0.3s_forwards]">
            <AppInput fullWidth autoFocus />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 opacity-0 animate-[fade-in_0.5s_0.6s_forwards]">
            {suggestions.map((suggestion, index) => <SuggestionButton key={index} text={suggestion} onClick={() => handleSuggestionClick(suggestion)} />)}
          </div>
        </div>
      </main>
      
      <footer className="text-center p-4 text-white/50 text-sm">
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
        </div>
      </footer>
    </div>;
};

export default Index;
