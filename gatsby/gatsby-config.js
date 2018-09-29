require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gunner Technology`,
    siteUrl: `https://gunnertech.com`,
  },
  plugins: [
    `gatsby-plugin-offline`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gunner Technology`,
        short_name: `GT`,
        start_url: `/`,
        background_color: `#132538`,
        theme_color: `#EF4035`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOGLE_PAGE_MANAGER_CONTAINER_ID,
  
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
  
        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gunner Technology`,
        short_name: `GT`,
        start_url: `/`,
        background_color: `#132538`,
        theme_color: `#EF4035`,
        display: `minimal-ui`,
        icon: `src/assets/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-youtube`,
      options: {
        channelId: process.env.YOUTUBE_CHANNEL_ID,
        apiKey: process.env.YOUTUBE_API_KEY, //TODO: Set to be only gunnertech.com domain in console
        maxVideos: 150 // Defaults to 50
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Montserrat:400,700`,
          `Raleway:400,300,300italic,400italic,500,500italic,600,600italic,700,700italic`,
          `Roboto:300,400,500`
        ]
      }
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "gunnertech.wordpress.com",
        protocol: "https",
        hostingWPCOM: true,
        verboseOutput: true,
        perPage: 100,
        useACF: false,
        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          sourceUrl: "https://gunnertech.wordpress.com",
          replacementUrl: "",
        },
        concurrentRequests: 10,
        excludedRoutes: ["/*/*/comments", "/yoast/**"],
        auth: {
          // If hostingWPCOM is true then you will need to communicate with wordpress.com API
          // in order to do that you need to create an app (of type Web) at https://developer.wordpress.com/apps/
          // then add your clientId, clientSecret, username, and password here
          /// TODO: move this out of repo
          wpcom_app_clientSecret: process.env.WORDPRESS_SECRET, 
          wpcom_app_clientId: process.env.WORDPRESS_CLIENT_ID,
          wpcom_user: process.env.WORDPRESS_USER,
          wpcom_pass: process.env.WORDPRESS_PASS,
        },
        normalizer: function({ entities }) {
          return entities
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-graphcms`,
      options: {
        endpoint: `https://api-useast.graphcms.com/v1/cjku689k7008j01aq2szws9g7/master`,
        query: require("./gatsby/configQuery")
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gunner Technology`,
        short_name: `GT`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icons: [
          {
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `/favicons/android-chrome-256x256.png`,
            sizes: `256x256`,
            type: `image/png`
          },
          {
            src: `/favicons/chrome-512.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    }
  ]
};
