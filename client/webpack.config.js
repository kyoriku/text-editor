// Importing required modules
const HtmlWebpackPlugin = require('html-webpack-plugin'); // HTML Webpack Plugin for generating HTML files
const WebpackPwaManifest = require('webpack-pwa-manifest'); // Webpack PWA Manifest Plugin for generating a Web App Manifest
const path = require('path'); // Node.js path module for working with file and directory paths
const { InjectManifest } = require('workbox-webpack-plugin'); // Workbox Webpack Plugin for generating a service worker

module.exports = () => { // Exporting a function that returns the webpack configuration object
  return {
    mode: 'development', // Setting webpack mode to development
    entry: { // Entry points for webpack bundling
      main: './src/js/index.js', // Main entry point
      install: './src/js/install.js' // Entry point for installation-related code
    },
    output: { // Output configuration for bundled files
      filename: '[name].bundle.js', // Output file name with placeholders for entry names
      path: path.resolve(__dirname, 'dist'), // Output directory path
    },
    plugins: [ // Array of plugins used in webpack configuration
      new HtmlWebpackPlugin({ // Generating HTML files from templates
        template: './index.html', // Path to the HTML template file
        title: 'JATE', // Title of the generated HTML file
        favicon: './favicon.ico' // Path to the favicon
      }),
      new InjectManifest({ // Generating a service worker for caching assets
        swSrc: './src-sw.js', // Path to the service worker source file
        swDest: 'src-sw.js', // Output path for the generated service worker
      }),
      new WebpackPwaManifest({ // Generating Web App Manifest file
        fingerprints: false, // Disabling fingerprinting of assets
        inject: true, // Automatically injects manifest into HTML files
        name: 'Just Another Text Editor', // Name of the web app
        short_name: 'J.A.T.E.', // Short name for the web app
        description: 'Take notes with JavaScript syntax highlighting!', // Description of the web app
        background_color: '#272822', // Background color of the web app
        theme_color: '#272822', // Theme color of the web app
        start_url: './', // Starting URL when launching the web app
        publicPath: './', // Public path for the assets
        id: './', // Unique identifier for the web app
        icons: [ // Array of icons for different sizes
          {
            src: path.resolve('src/images/logo.png'), // Path to the icon file
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Destination directory for the icons
          },
        ],
      }),
    ],
    module: { // Module configuration for handling different file types
      rules: [ // Array of rules for file handling
        {
          test: /\.css$/i, // Regular expression to match CSS files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for processing CSS files
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i, // Regular expression to match image files
          type: 'asset/resource', // Use asset/resource to emit the asset as a separate file and export the URL
        },
        {
          test: /\.m?js$/, // Regular expression to match JavaScript files
          exclude: /node_modules/, // Exclude node_modules directory from babel processing
          use: { // Use babel-loader for transpiling JavaScript files
            loader: 'babel-loader', 
            options: { // Options for babel-loader
              presets: ['@babel/preset-env'], // Use @babel/preset-env for configuring babel
              plugins: [ // Array of babel plugins
                '@babel/plugin-proposal-object-rest-spread', // Plugin for object spread syntax
                '@babel/transform-runtime', // Plugin for polyfilling features using the babel runtime
              ],
            },
          },
        },
      ],
    },
  };
};
