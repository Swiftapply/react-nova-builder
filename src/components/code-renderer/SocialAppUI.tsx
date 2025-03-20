
import React from 'react';

interface SocialAppUIProps {
  parsedUI: any;
}

export const SocialAppUI: React.FC<SocialAppUIProps> = ({ parsedUI }) => {
  return (
    <div className="flex flex-col p-2">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
            <div className="text-sm font-semibold">username</div>
          </div>
          <div className="h-4 w-4" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        </div>
        
        <div className="rounded-xl overflow-hidden h-64 bg-gray-200 mb-2"></div>
        
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-4">
            <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
            <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
            <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
          </div>
          <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        </div>
        
        <div className="text-sm mb-1"><span className="font-semibold">237 likes</span></div>
        <div className="text-sm"><span className="font-semibold">username</span> {parsedUI.features?.[0] || 'Check out this amazing photo I took today! #photography #nature'}</div>
        <div className="text-xs text-gray-500 mt-1">View all 42 comments</div>
        <div className="text-xs text-gray-500 mt-1">2 HOURS AGO</div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
            <div className="text-sm font-semibold">another_user</div>
          </div>
          <div className="h-4 w-4" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        </div>
        
        <div className="rounded-xl overflow-hidden h-64 bg-gray-200 mb-2"></div>
        
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-4">
            <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
            <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
            <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
          </div>
          <div className="h-5 w-5" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
        </div>
        
        <div className="text-sm mb-1"><span className="font-semibold">164 likes</span></div>
        <div className="text-sm"><span className="font-semibold">another_user</span> {parsedUI.features?.[1] || 'Just hanging out with friends today! #weekend #friends'}</div>
        <div className="text-xs text-gray-500 mt-1">View all 24 comments</div>
        <div className="text-xs text-gray-500 mt-1">5 HOURS AGO</div>
      </div>
    </div>
  );
};
