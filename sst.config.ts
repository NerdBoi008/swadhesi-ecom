/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "swadhesi-ecom",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "ap-south-1",
          profile: "dev", // Consider using a dedicated profile or IAM role for production
        },
      },
    };
  },

  async run() {
    const aws = await import("@pulumi/aws");

    const bucketName = "category-products-images";

    const categoryProductsBucket = new sst.aws.Bucket(
      "category-products-images",
      {
        public: true,
        cors: {
          allowOrigins: ["*"],
          allowMethods: ["GET"],
          allowHeaders: ["*"],
          maxAge: '3000 seconds',
        },
      }
    );
    
    // ** Cost Optimization: Configure Intelligent-Tiering **
    const bucketIntelligentTieringConfig =
      new aws.s3.BucketIntelligentTieringConfiguration(
        "swadhesi-category-products-images-intelligent-tiering",
        {
          bucket: categoryProductsBucket.name, // Link to the bucket
          status: "Enabled",
          tierings: [
            {
              accessTier: "ARCHIVE_ACCESS",
              days: 90, // Transition to Archive Instant Access after 90 days of no access
            }, // You can add more tiers like ARCHIVE_ACCESS and DEEP_ARCHIVE_ACCESS
            // with longer periods if you need even lower cost for very rarely accessed data.
          ], // Optional: Add a filter if you only want Intelligent-Tiering to apply to a subset of objects
          // filter: {
          //     prefix: "product-images/",
          // },
        }
      ); // ** Cost Optimization: Configure Lifecycle Rules (for expiration and other actions) **

    const bucketLifecycleConfig = new aws.s3.BucketLifecycleConfigurationV2(
      "swadhesi-category-products-images-lifecycle",
      {
        bucket: categoryProductsBucket.name, // Link to the bucket
        rules: [
          {
            id: "cleanup-incomplete-uploads",
            status: "Enabled",
            abortIncompleteMultipartUpload: {
              daysAfterInitiation: 7, // Clean up incomplete uploads after 7 days
            },
          },
        ],
      }
    );

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
  },
});
