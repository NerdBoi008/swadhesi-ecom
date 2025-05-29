"use client"; // !!! IMPORTANT: This directive makes this a Client Component

// Import your Amplify configuration file here
import './auth-configuration';

interface AmplifyClientWrapperProps {
  children: React.ReactNode;
}

export function AmplifyClientWrapper({ children }: AmplifyClientWrapperProps) {
   // This component doesn't render any extra DOM elements,
   // it just ensures the import (and thus the configuration) runs client-side early.
  return <>{children}</>;
}