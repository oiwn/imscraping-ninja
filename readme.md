# imwebscraping.ninja website

[web scraping service](http://imscraping.ninja)

Static website in HTML/LESS/AngularJS using gulp.

# Tasks list

  ### Projects feature

  - [ ] controllers for single project view

  ### Small fixes

  - [ ] change partials extension to avoid linter errors (no doctype)

  ### Improvements

  - [ ] check if gulp can execute tasks in parallel
  - [ ] speed up build process
  - [ ] backup content to the Dropbox


# Features list

  - [ ] order form http://docs.divshot.com/services/forms
  - [ ] authorization (mongolab)
  - [ ] http://jschr.github.io/textillate/ https://github.com/daneden/animate.css http://h5bp.github.io/Effeckt.css/
  - [ ] take a look on css frameworks https://github.com/jonikorpi/Less-Framework http://purecss.io/
  - [ ] schema.org definitions
  - [ ] speed up first gulp run by moving all processing into memory and caching
  - [ ] add coverage reporter https://coderwall.com/p/adgitg/coverage-report-with-gulp-and-istanbul
  - [ ] add karma tests runner https://github.com/Meesayen/gladius-forge
  - [ ] check how to generate static website https://github.com/paulwib/gulp-ssg
  - [ ] add gulp inject http://stackoverflow.com/questions/22515538/include-cdn-sources-in-gulp-inject?rq=1 http://denbuzze.com/post/5-lessons-learned-using-gulpjs/
  - [ ] https://github.com/JSRocksHQ/harmonic cool static generator
  - [ ] add less compression https://github.com/less/less-plugin-clean-css https://github.com/plus3network/gulp-less
  - [ ] badge with dependencies https://david-dm.org/
  - [ ] wow add it "Checks various aspects of a web page for correctness" https://www.npmjs.com/package/check-pages/
  - [ ] https://github.com/sindresorhus/gulp-changed maybe possible to reduce rendering time?
  - [ ] https://npmjs.org/package/gulp-check-unused-css/ add util
  - [ ] https://github.com/Falci/falci-gulp-tasks check tasks
  - [ ] generate atom feed https://github.com/hexojs/hexo-generator-feed/blob/master/atom.ejs
  - [ ] generate the sitemap https://github.com/hexojs/hexo-generator-sitemap/blob/master/sitemap.ejs
  - [ ] templates http://handlebarsjs.com/ (there is angular templates already, could be useful only to render sitemap)
  - [ ] pagination and filters for projects and posts
  - [ ] use metalsmith to generate website instead of bunch of gulp scripts


  - [ ] add open graph tags http://ogp.me/ (content submission to facebook/twitter)


# How To Use

Setup project environment

  + ```npm install```
  + ```bower install```

Develop

  + gulp serve

Deploy

  + ```gulp build```
  + ```divshot push```
