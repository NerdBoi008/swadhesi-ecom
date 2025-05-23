const bucketName = "swadhesi-category-products-images";

const categoryProductsBucket = new aws.s3.Bucket(bucketName, {
  bucket: bucketName,
  acl: "public-read", // Equivalent to access: 'public' for public read
  corsRules: [
    {
      allowedOrigins: [
        "https://www.swadhesi.com",
        "http://localhost:3001",
        "http://localhost:3000",
      ],
      allowedMethods: ["GET", "PUT", "POST", "DELETE"],
      allowedHeaders: ["*"],
      maxAgeSeconds: 3000,
    },
  ],
});

// ** Cost Optimization: Configure Intelligent-Tiering **
// You can enable Intelligent-Tiering on the bucket. Objects uploaded
// without a specific storage class or transitioned by a rule can go here.
const bucketIntelligentTieringConfig =
  new aws.s3.BucketIntelligentTieringConfiguration(
    "swadhesi-category-products-images-intelligent-tiering",
    {
      bucket: categoryProductsBucket.id, // Link to the bucket
      status: "Enabled",
      tierings: [
        {
          accessTier: "ARCHIVE_INSTANT_ACCESS",
          days: 90, // Transition to Archive Instant Access after 90 days of no access
        },
        // You can add more tiers like ARCHIVE_ACCESS and DEEP_ARCHIVE_ACCESS
        // with longer periods if you need even lower cost for very rarely accessed data.
        /*
        {
            accessTier: "ARCHIVE_ACCESS",
            days: 180, // Transition to Archive Access after 180 days of no access
        },
        {
            accessTier: "DEEP_ARCHIVE_ACCESS",
            days: 365, // Transition to Deep Archive Access after 365 days of no access
        },
        */
      ],
      // Optional: Add a filter if you only want Intelligent-Tiering to apply to a subset of objects
      // filter: {
      //     prefix: "product-images/",
      // },
    }
  );

const bucketLifecycleConfig = new aws.s3.BucketLifecycleConfigurationV2(
  "swadhesi-category-products-images-lifecycle",
  {
    bucket: categoryProductsBucket.id, // Link to the bucket
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

// Example of how you might define a CloudFront distribution using Pulumi (what SST Ion uses)
/*
    const distribution = new aws.cloudfront.Distribution("swadhesi-image-cdn", {
        origins: [{
            domainName: categoryProductsBucket.bucketRegionalDomainName,
            originId: categoryProductsBucket.id,
            // Configure Origin Access Control (OAC) for secure access
            s3OriginConfig: {
                originAccessControl: new aws.cloudfront.OriginAccessControl("swadhesi-image-oac", {
                    description: "OAC for S3 image bucket",
                    originAccessControlConfig: {
                        signingBehavior: "no-override", // Or " प्रभुसत्ता " depending on your needs
                        signingProtocol: "sigv4",
                      applicationProtocol: "http-only" // Or "https-only" if bucket requires HTTPS
                    },
                }).id,
            },
        }],
        enabled: true,
        isIpv6Enabled: true,
        defaultCacheBehavior: {
            allowedMethods: ["GET", "HEAD", "OPTIONS"],
            cachedMethods: ["GET", "HEAD", "OPTIONS"],
            targetOriginId: categoryProductsBucket.id,
            viewerProtocolPolicy: "redirect-to-https",
            forwardedValues: { // Configure how headers, query strings, and cookies are forwarded
                queryString: false,
                cookies: { forward: "none" },
                headers: ["Origin", "Access-Control-Request-Headers", "Access-Control-Request-Method"],
            },
            minTtl: 0,
            defaultTtl: 86400, // Cache for 1 day
            maxTtl: 31536000, // Max cache for 1 year
          compress: true, // Enable compression
        },
        // Add more configurations like priceClass, restrictions, logging, etc.
        restrictions: {
            geoRestriction: {
                restrictionType: "none", // Or "whitelist" or "blacklist"
            },
        },
      viewerCertificate: {
          cloudfrontDefaultCertificate: true, // Use default CloudFront certificate
      },
    }); */

// Output the bucket name and other relevant details
this.addOutputs({
  BucketName: categoryProductsBucket.bucket,
  // ImageCDNUrl: distribution.domainName, // If you add CloudFront
});
