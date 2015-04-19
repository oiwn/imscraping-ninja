module.exports = {
  vendorsJS: [
    './src/components/angular/angular.js'
  ],
  appJS: [],
  appLESS: ['src/styles/main.less'],
  buildDir: 'build',
  assetsDest: 'build/assets',

  siteStruct: [
    'src/*.html',
    'src/views/*.html',
    'src/robots.txt',
  ]
};
