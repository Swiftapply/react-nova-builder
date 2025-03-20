
import React from 'react';

interface FinanceAppUIProps {
  parsedUI: any;
}

export const FinanceAppUI: React.FC<FinanceAppUIProps> = ({ parsedUI }) => {
  return (
    <div className="flex flex-col p-4">
      <div className="mb-6">
        <div className="text-lg font-semibold mb-1">Hello, User</div>
        <div className="text-sm text-gray-500">Your balance</div>
        <div className="text-3xl font-bold" style={{ color: parsedUI.primaryColor || '#4F46E5' }}>$2,456.80</div>
      </div>
      
      <div className="flex justify-between mb-6">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1" 
            style={{ backgroundColor: `${parsedUI.primaryColor || '#4F46E5'}20` }}>
            <div className="h-4 w-4" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
          </div>
          <div className="text-xs">Send</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1" 
            style={{ backgroundColor: `${parsedUI.primaryColor || '#4F46E5'}20` }}>
            <div className="h-4 w-4" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
          </div>
          <div className="text-xs">Request</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1" 
            style={{ backgroundColor: `${parsedUI.primaryColor || '#4F46E5'}20` }}>
            <div className="h-4 w-4" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
          </div>
          <div className="text-xs">Pay</div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1" 
            style={{ backgroundColor: `${parsedUI.primaryColor || '#4F46E5'}20` }}>
            <div className="h-4 w-4" style={{ backgroundColor: parsedUI.primaryColor || '#4F46E5', WebkitMaskImage: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>\')', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center' }}></div>
          </div>
          <div className="text-xs">More</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-medium">Recent Transactions</div>
          <div className="text-xs" style={{ color: parsedUI.primaryColor || '#4F46E5' }}>See all</div>
        </div>
        
        <div className="space-y-3">
          {[
            { name: 'Coffee Shop', amount: '-$4.99', date: 'Today', icon: '☕' },
            { name: 'Grocery Store', amount: '-$32.50', date: 'Yesterday', icon: '🛒' },
            { name: 'Jane Smith', amount: '+$150.00', date: 'Apr 21', icon: '👤' }
          ].map((transaction, i) => (
            <div key={i} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
                  style={{ backgroundColor: `${parsedUI.accentColor || '#34D399'}20` }}>
                  <div>{transaction.icon}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">{transaction.name}</div>
                  <div className="text-xs text-gray-500">{transaction.date}</div>
                </div>
              </div>
              <div className="text-sm font-medium">{transaction.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
