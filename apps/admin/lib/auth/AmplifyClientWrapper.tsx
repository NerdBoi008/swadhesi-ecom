"use client"; // !!! IMPORTANT: This directive makes this a Client Component

import { useEffect } from 'react';
// Import your Amplify configuration file here
import './auth-configuration';

interface AmplifyClientWrapperProps {
  children: React.ReactNode;
}

export function AmplifyClientWrapper({ children }: AmplifyClientWrapperProps) {
   // Optional: Add a log to see when this component renders client-side
   useEffect(() => {
       console.log('AmplifyClientWrapper mounted (client-side)');
   }, []);

   // This component doesn't render any extra DOM elements,
   // it just ensures the import (and thus the configuration) runs client-side early.
  return <>{children}</>;
}