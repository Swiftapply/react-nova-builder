
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-white/80 mb-8">This page doesn't exist</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
