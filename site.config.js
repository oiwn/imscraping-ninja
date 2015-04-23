module.exports = {
  siteName: 'imscraping.ninja',
  siteUrl: 'http://www.imscraping.ninja',

  env: {
    debug: true,
    silent: false,
  },

  assets: {
    vendorsJS: [
      'src/components/angular/angular.js',
      'src/components/angular-ui-router/release/angular-ui-router.js',
      'src/components/angular-animate/angular-animate.js',
      'src/components/angular-loading-bar/build/loading-bar.js'
    ],
    appJS: [
      'src/app/app.js',
      'src/app/routes.js',
    ],
    appLESS: [
      'src/styles/main.less'
    ],

    vendorsJSDest: 'vendors.min.js',
    appJSDest: 'app.min.js',
    appCSSDest: 'app.min.css'
  },

  buildDir: 'build',
  assetsDest: 'build/assets',

  siteStruct: [
    'src/*.html',
    'src/robots.txt',
    'src/favicon.ico',
  ]
};
