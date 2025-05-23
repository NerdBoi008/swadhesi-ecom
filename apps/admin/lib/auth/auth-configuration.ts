"use client"

import { Amplify } from 'aws-amplify';

// Make sure these environment variables are defined in your .env file (e.g., .env.local)
// and correctly prefixed according to your framework (NEXT_PUBLIC_, REACT_APP_, VITE_, etc.)

const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID; // Replace with your actual prefix
const userPoolClientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID; // Replace with your actual prefix
const identityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID; // Replace with your actual prefix

// Check if necessary variables are defined before configuring
if (!userPoolId || !userPoolClientId) {
  console.error("Amplify configuration failed: Cognito User Pool ID and Client ID are required environment variables.");
  // Depending on your application's robustness needs, you might want to:
  // - Throw an error to halt the app start early if config is missing.
  // - Render an error message component to the user.
  // - Log this error prominently and continue (though Amplify operations will fail).
} else if (Amplify.getConfig().Auth === undefined) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: userPoolId,
        userPoolClientId: userPoolClientId,
        identityPoolId: identityPoolId!, // Keep if needed
        loginWith: {
          email: true,
        },
        signUpVerificationMethod: "code",
        userAttributes: {
          email: {
            required: true,
          },
        },
        // allowGuestAccess: true, // Keep if needed
        passwordFormat: {
          minLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialCharacters: true,
        },
      },
    },
    // ssr: true // Keep your SSR flag if using an SSR framework
  });
  console.log("Amplify configured manually with environment variables.");
} else {
  console.log("Amplify already configured.");
}