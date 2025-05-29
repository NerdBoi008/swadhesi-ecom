const userPool = new sst.aws.CognitoUserPool("swadhesi-user-pool", {
  usernames: ["email"],
  transform: {
    userPool(args) {
      (args.passwordPolicy = {
        minimumLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true,
      }),
        (args.accountRecoverySetting = {
          recoveryMechanisms: [
            {
              name: "verified_email",
              priority: 1,
            },
          ],
        });
    },
  },

  verify: {
    emailSubject: "Verify Your Email to Get Started with Swadhesi",
    emailMessage:
      "Welcome to Swadhesi! Your email verification code is {####}. Enter this code to complete your sign-up.",
    smsMessage:
      "Swadhesi: Your verification code is {####}. Do not share this code with anyone.",
  },
});

const userPoolClient = new aws.cognito.UserPoolClient(
  "swadhesi-user-pool-client",
  {
    name: "swadhesi-web-client",
    userPoolId: userPool.id,
    generateSecret: false, // Set to true if you need a client secret
    explicitAuthFlows: [
      "ALLOW_USER_PASSWORD_AUTH",
      "ALLOW_USER_SRP_AUTH",
      "ALLOW_REFRESH_TOKEN_AUTH",
    ],
    allowedOauthFlows: ["code"],
    allowedOauthScopes: ["email", "openid", "profile"],
    allowedOauthFlowsUserPoolClient: true,
    callbackUrls: [
      "https://www.swadhesi.com",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    logoutUrls: ["https://www.swadhesi.com"],
    supportedIdentityProviders: ["COGNITO"],
    refreshTokenValidity: 30, // days
  }
);

const userIdentityPool = new sst.aws.CognitoIdentityPool(
  "swadhesi-user-identity-pool",
  {
    userPools: [
      {
        userPool: userPool.id,
        client: userPoolClient.id,
      },
    ],

    permissions: {
      authenticated: [
        {
          actions: ["s3:GetObject", "s3:PutObject"],
          resources: ["arn:aws:s3:::my-bucket/*"],
        },
      ],
    },
  }
);


