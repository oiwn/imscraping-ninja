module.exports = {
  siteName: 'imscraping.ninja',
  siteUrl: 'http://www.imscraping.ninja',
  version: '0.0.6',

  env: {
    debug: true,
    silent: false,
  },

  // Required assets
  assets: {
    vendorsJS: [
      'src/components/angular/angular.js',
      'src/components/angular-ui-router/release/angular-ui-router.js',
      'src/components/angular-resource/angular-resource.js',
      'src/components/angular-animate/angular-animate.js',
      'src/components/angular-sanitize/angular-sanitize.js',
      'src/components/angular-loading-bar/build/loading-bar.js',
    ],
    appJS: [
      'src/app/app.js',
      'src/app/routes.js',
      'src/app/services/*.js',
      'src/app/controllers/*.js',
    ],
    appLESS: [
      'src/styles/main.less',
    ],

    // Assets filenames
    vendorsJSDest: 'vendors.min.js',
    appJSDest: 'app.min.js',
    appCSSDest: 'app.min.css',
  },

  buildDir: 'build',
  assetsDest: 'build/assets',

  // required files
  siteStruct: [
    'src/*.html',
    'src/robots.txt',
    'src/favicon.ico',
  ],

  content: {
    projects: 'content/projects/*.md',
    blog: 'content/posts/*.md',
  },

  pages: {
    home: {template: 'home.html', context: 'default.json', content: 'home.md'},
    about: {template: 'about.html', context: 'default.json', content: 'about.md'},
    projects: {template: 'projects.html', context: 'default.json', content: 'projects.md'},
    tech: {template: 'tech.html', context: 'default.json', content: 'tech.md'},
  },
};
