const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const WebpackOnBuildPlugin = require('on-build-webpack');
const fs = require('fs');

const VENDOR = [
    'babel-polyfill',
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'jquery'
];

const PATHS = {
    app: path.join(__dirname, './src/js/'),
    build: path.join(__dirname, './{{cookiecutter.project_slug}}/static/js/bundles/'),
    staticfiles: path.join(__dirname, './{{cookiecutter.project_slug}}/static/js'),
};

module.exports = {
  //the base directory (absolute path) for resolving the entry option
  context: __dirname,
  //the entry point we created earlier. Note that './' means
  //your current directory. You don't have to specify the extension  now,
  //because you will specify extensions later in the `resolve` section
  // entry: { , , scrape: './assets/js/scrape' },
  entry: {
        vendor: VENDOR,
        home: './src/js/home',
    },

  output: {
    //where you want your compiled bundle to be stored
    path: PATHS.build,
    //naming convention webpack should use for your files
    filename: '[name]-[hash].js',
  },

  plugins: [
    //tells webpack where to store data about your bundles.
    new BundleTracker({ path: PATHS.staticfiles, filename: 'webpack-stats.json' }),
    //makes jQuery available in every module
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new WebpackOnBuildPlugin(function(stats) {
      const newlyCreatedAssets = stats.compilation.assets;

      const unlinked = [];
      fs.readdir(path.resolve(PATHS.build), (err, files) => {
        files.forEach(file => {
          if (!newlyCreatedAssets[file]) {
            fs.unlink(path.resolve(PATHS.build + file));
            unlinked.push(file);
          }
        });
        if (unlinked.length > 0) {
          console.log('Removed old assets: ', unlinked);
        }
      })
    })

  ],

  module: {
    loaders: [
      //a regexp that tells webpack use the following loaders on all
      //.js and .jsx files
      {
        test: /\.jsx?$/,
        //we definitely don't want babel to transpile all the files in
        //node_modules. That would take a long time.
        exclude: /node_modules/,
        //use the babel loader
        loader: 'babel-loader',
        query: {
          //specify that we will be dealing with React code
          presets: ['react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },

  resolve: {
    //tells webpack where to look for modules
    modules: ['node_modules'],
    //extensions that should be used to resolve modules
    extensions: ['.js', '.jsx']
  }
}

