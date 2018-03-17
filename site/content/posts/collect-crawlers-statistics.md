+++
date = "2018-02-22T14:21:00+07:00"
title = 'Collect crawling statistics for Grab Spiders'
description = ""
keywords = "grab framework, statistics"
tags = ["grab framework", "howto"]
+++

It's usually not a problem to collect runtime statistics where there is only one
Grab crawler in project. But what if you have many many data sources and each
one required own crawler? What if they're reccurent and you need to know if
something broke? And here engeenering comes to play, after some iteration you
usully want to come to something like this:

So after few iterations you come out with this:

![](/media/grab_scrapers_monitoring.jpg)

When there is a lot of crawlers to control you'll **need** something like that.

Let's imagine we have 2 crawlers to collect listed repositories from 2 github pages.

+ https://github.com/collections/machine-learning
+ https://github.com/collections/clean-code-linters

Scrapers are trivial:

```python
class MLCollectionSpider(Spider):
    url = "https://github.com/collections/machine-learning"

    def task_generator(self):
        yield Task('page', url=self.url)

    def task_page(self, grab, task):
        print("Page: {}".format(grab.doc.url))
```

```python
class LintersCollection(Spider):
    url = "https://github.com/collections/clean-code-linters"

    def task_generator(self):
        yield Task('page', url=self.url)

    def task_page(self, grab, task):
        print("Page: {}".format(grab.doc.url))
```
