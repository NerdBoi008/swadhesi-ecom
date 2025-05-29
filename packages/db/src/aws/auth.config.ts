'use server';

import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.COGNITO_USER_POOL_ID!, // Ensure this is set in your environment
      userPoolClientId: process.env.USER_POOL_CLIENT_ID!, // Ensure this is set in your environment
      identityPoolId: process.env.IDENTITY_POOL_ID!, // Optional, keep if needed
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
});