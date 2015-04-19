module.exports = {
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
  appLESS: ['src/styles/main.less'],
  buildDir: 'build',
  assetsDest: 'build/assets',

  siteStruct: [
    'src/*.html',
    'src/robots.txt',
  ]
};
