+++
date = "2014-05-28T00:04:15+07:00"
title = "Grab - modern python framework for data scraping"
description = "practical example of using grab framework for web scraping"
keywords = "grab framework, web scraping"
tags = ["grab framework", "web scraping"]
+++

Writing posts is hards, especially using foreign language. So at first i'll
provide brief and than will try to explain in more details using bad English (my
appologies).

## What is Grab?

How many mature python web scraping frameworks do you know? I bet the first
thing come in mind would be - Scrapy. Well no more. There is another one
framework which used in production for different kind of projects for years.
This framework used to scrape nearly all noticeable big websites in internet:
Google Play, App Store, Booking, Agoda, TripAdvisor, Yelp, AngelList etc. and
hundreds if not thousands of e-commerce stores.

It was covertly developed by the Siberian
guy [Lorien](https://github.com/lorien), mainly used by small organized group
and was never introduced to the worldwide community, primarily because of lack
of documentation. Fortunately author finished English docs this year and i guess
the time is come.

+ [Grab English Documentation](http://docs.grablib.org/en/latest/)
+ [Grab Framework on Github](https://github.com/lorien/grab)

The Grab framework developed from strictly practical purposes therefore it
sugnifficially different from Scrapy. Noticeable features would be:

+ **Python 3 ready**
+ Less dependencies
+ **HTTP and SOCKS proxies support**
+ International Domain Name support
+ Flexible customization of HTTP requests
+ Powerful API of extracting info from HTML documents with XPATH queries
+ Asynchronous API to make thousands of simultaneous queries. This part of
  library called **Spider**.
+ **Automatical change of User Agent**
+ **Rotating proxies implementation out of the box**
+ Clear mechanism of requests flow
+ Multiprocessing support
+ Few build-in HTTPCache/Queue backends (MySQL, Postgres, MongoDB, Redis)

Grab learning curve is not even half as hard as with Scrapy. It's pretty
simple but powerful framework, even if Grab not so popular, the numbers of
commits are not too much different 2000+ for Scrapy and 1500+ for Grab. And by
the way Grab tests coverage is better.

TLDR; Grab Framework could be reasonable alternative to Scrapy especially for
people who're relying on Python 3. More easy to learn, less dependencies, with
few backends for http cache/tasks queue and proxies support out-of-the-box.

## What is Grab and what is Grab:Spider?

Grab is a http requests lib similar to `requests`. In general it's a wrapper
around the `pycurl` library to make your life easy. `PyCurl` is low level and
does not do too much, you have to take care of many things by yourself.

It could be used for web scraping task, but it would inefficient. For better
performance you'll need to do scraping in a few threads. It's pretty hard to use
threads for any complex web scraping task, where as usual you have to route
requests in a right order and share some state between threads.

### Grab

You can think about the grab as about headless browser without javascript
enabled.

 ```python
from grab import Grab

g = Grab()
g.go('https://github.com/login')
g.set_input('login', '***')
g.set_input('password', '***')
g.submit()
g.doc.save('/tmp/x.html')

g.doc(
  '//span[contains(@class, "octicon-sign-out")]').assert_exists()
home_url = g.doc(
  '//a[contains(@class, "header-nav-link name")]/@href').text()
repo_url = home_url + '?tab=repositories'

g.go(repo_url)
for elem in g.doc.select('//h3[@class="repo-list-name"]/a'):
    print('%s: %s' % (elem.text(),
                      g.make_url_absolute(elem.attr('href'))))
```

### Grab:Spider

The most interesting part of library and the reason why it's called a
"Framework" is **Spider** - implementation of asynchronous scraping.

Basically Grab:Spider is a framework which process network requests
asynchronously using `multicurl` library. Each request processed by defined
handler which could spawn new request which will be processed by other handlers.

```python
from grab.spider import Spider, Task

class ExampleSpider(Spider):
    def task_generator(self):
        for lang in ('python', 'ruby', 'perl'):
            url = 'https://www.google.com/search?q={}'.format(lang)
            yield Task('search', url=url, lang=lang)

    def task_search(self, grab, task):
        print('{}: {}'.format(
            task.lang,
            grab.doc('//div[@class="s"]//cite').text()
        ))

bot = ExampleSpider()
bot.run()
```

If you used Scrapy Framework before, you could notice the difference between
grab handlers and Scrapy callbacks. Scrapy callbacks accept `Response`
object as a parameter. While in grab:spider you got your "headless browser" Grab
instance and Task object which contains parameters used by Grab:Spider to send
network request. Also pay attention that in grab handlers should start with
`task_` prefix.

## Ok i'm interested, how to start?

I believe the best way to start would be to take practical task, implement it
and to demonstrate how framework could help you to resolve problems.

I prepared simple web scraping project to demonstrate how framework could help
you to scrape data more effectively. This scraper build to collect information
from the list of data science blogs posted here
https://github.com/rushter/data-science-blogs and store collected data into the
mongodb.

This is what you need to follow example:

+ mongodb (only for this example, it's not required for grab)
+ python 2.7 (tested on 2.7)

Clone repository

`git clonehttps://github.com/istinspring/grab-datascience-blogs`

create and activate virtual environment for this project, cd into the project
directory and install required dependencies `pip install -r
requirements.txt`. Next you need to copy blog list \*.opml file into the
project's `var/`.

```bash
wget https://raw.githubusercontent.com/rushter/data-science-blogs/master/data-science.opml -P var/
```

And finally run it with `python cli.py -S var/data-science.opml` command.

## Digging into the code.

Let's follow the code, i'll try explain it in details. It's just a simplified
version of template i used as initial point for web scraping projects. Of course
it's possible to remove unnecessary parts and cut the code into just one file,
but the goal is to demonstrate you how actual web scraping projects usually
developed.

There is few parts, first `cli.py` a command line interface used to perform
various set of tasks, in this case it have 2 options - run scraper and run few
mongodb queries over collected data.

Usually you will have more than one spider, so it would be useful to move common
parts into the base class and inherit your scrapers from or as option use
mixins. So there is `scrapers/base.py` with `BaseSpider` where methods
to save data and setup Spider object are defined.

Initialization code for your scrapers could be complex and probably better to
move this code into the separated module/class, usually i have it in
`utils/`. In this project initialization code located just inside the
scraper as `get_instance` classmethod.

Spider object accept different parameters described in ~~documentation~~ source
code in details, for this task i store this params in `settings.py` file.
Grab implemented in a way to do things "by default", for example if Grab:Spider
can't receive response for some reasons, it will not skip it silently like
Scrapy do "by default", Grab will try to perform request again. It's not cool
when your framework missed whole category, just because target server failed to
send response.

```python
SPIDER_CONFIG = {
    'thread_number': 10,
    'network_try_limit': 3,
    'task_try_limit': 3,
    'max_task_generator_chunk': 5,
    'priority_mode': 'const',
}
```

As you can see in [get_instance](https://github.com/istinspring/grab-datascience-blogs/blob/master/spiders/base.py#L37) it's possible to define list of proxies,
and backends for http cache and tasks queue. After you done with
initialization run the spider:

```python
spider = DataScienceBlogsSpider.get_instance(
    data_science_blogs_list=args.scrape_blogs)
spider.run()
```

When we run scraper it will activate handler called `task_generator` this
method used to spawn initial tasks for further processing. There is another
way - you could defince class attribute called `initial_urls` and Grab will
generate tasks for you and pass results into the `task_initial` handler.

```python
def task_generator(self):
    blogs = self.parse_blogs_list()
    for blog in blogs:
        yield Task('html', url=blog['html'], blog=blog)
```

Here we generate tasks to the blog pages. Notice that grab handlers are python
generators, the tasks will not performed "immediately", but scheduled by
Garb:Spider (according to the task priority).

Sometimes websites are trying to filter request using various methods: filtering
by user-agent or ip address. With Grab you can easily bypass it. First of all
there is out-the-box feature to work with list of proxies. Grab:Spider by
default will rotate them for each request. Same for User Agents. But at the same
time it's possible to define the chains of requests which will utilize same
proxy.

Remember i compared grab object with headless browser? It's basically
incapsulates both Request and Response.

> Each spider is a set of response handlers. Response handler receives grab
> object that was used to make network requests and that contains data about
> response. Via grab object you have access to low-level details like: headers,
> cookies, payload and to high-level API for filling web forms, searching for
> text, querying the DOM.

So in handler you can clone grab object i.e. open new tab in the same browser
with same cookies and headers to spawn new request with slightly adjusted
parameters usually it's required if you "logged in" in previous request and want
to keep your session for the next request.

```python
def task_page(self, grab, task):
    # ...process the page...
    g = grab.clone()
    g.setup(url=task.blog['rss'])
    yield Task('rss', grab=g, blog=task.blog)
```

Much more clear than Scrapy magic with meta parameter right? You even could
define post request, it's pretty useful if you want to grab some additional data
using from website urls usually called by AJAX requests. For instance - google
play "permissions" for the application.

As you can see each handler starts with 'task_' and accept 2 parameters:

+ `grab` - Grab object
+ `task` - Task object

Task is used if data you want to scrape located on few pages and you'll need to
pass previously collected data to the new handler.

Also `task` accept parameters to setup task priority, control cache per request
(refresh/disable - useful for POST requests), counters for retries.

[http://docs.grablib.org/en/latest/spider/task.html](http://docs.grablib.org/en/latest/spider/task.html)

## Where are middlewares?

Grab has no such thing as Scrapy's middlewares. Scrapy tried to use similar
conceptions as traditional web frameworks, but from practical purposes it's not
necessary. As usual you need to highjack some parameters of the grab object
before the request or check some conditions, and this could be easily
implemented using ordinal python decorators.

```python
from grab.spider import Spider
from grab.decorators import integrity


class SomeSpider(Spider):
    """ Decorator code
    https://github.com/lorien/grab/blob/master/grab/spider/decorators.py
    """
    def check_integrity(self, grab):
        exists = grab.doc(
            '//div[@id="footer"]/a[text()="About Us"]'
        ).exists()
        if not exists:
            raise DataNotValid

    @integrity('check_integrity')
    def task_page(self, grab, task):
        pass
```

I made a [simple "page validation" decorator](https://github.com/istinspring/grab-datascience-blogs/blob/master/utils/decorators.py)

## Http cache and queue backends

It would be good idea to save scraped pages into the local http cache, to avoid
network i/o during development process, and there is few backends available for
mongodb, mysql and postgres. In most cases i use mongodb.

Another noticable feature - backends for task queues. Sometimes your scraper
handler could generate large amount of requests and consume a lot of memory
which could be a problem if memory is limited (small or micro instances).

In this case you could move your task queue from memory into the
database.
[https://github.com/lorien/grab/tree/master/grab/spider/queue_backen](https://github.com/lorien/grab/tree/master/grab/spider/queue_backend)

Queue backends for mongo and redis are available.

Queue backends used if your handlers produce too much tasks and they started to
consume memory, it's pertty common situation when you scraping e-commerce
websites using low tier cloud instance. So you have an option to move your tasks
into the mongodb or redis. Also it could be used to build distributed crawlers.

## Additional dependencies

Grab relies on 2 additional libs. Few month ago author decided to move out some
parts from grab library to keep the core simple:

+ [weblib](https://github.com/lorien/weblib) - Collection of tools for
  web-scraping
+ [selectors](https://github.com/lorien/selection) - API to extract data from
  HTML and XML documents

**weblib** is a library with a bunch of commonly used functions and helpers. As
far as i remember there is even scrapers for popular search engines!

While **selectors** provide nice syntax to lxml library so you sould use it
like:

```python
# extract text from html node in form of list
# ['title1', 'title2']
items = grab.doc('//h2[@class="item"]').text_list()
# extract one (first) text from node or return empty string
# if node not found
item = grab.doc('//h2[@class="item"]').text(default='')
# similar for attributes
images = grab.doc('//img[@class="item-image"]').attr_list('src')
# or just one, if there is no image exception will be rised
image = grab.doc('//img[@class="item-image"]').attr('src')
```

## Analyze data

After your scraper will finish work you could try to extract some useful info
from collected data. I'm not a noSQL bigot, but i believe it's a right tools if
you use them with caution and for right purposes. And it's turned out that
MongoDB is the best comfortable solution for web scraping. Primarily because
it's schema-less, and i use it all the times, even if it's not main database for
project, it's really worth to use it like a middle storage for your raw data
which could be processed, validated and stored into the Postgres (which of
course better for e-commerce because of transactions, strict structure,
guaranteed record etc.)

Count all blogs with authors:

```javascript
db.blogs.find({ content.authors: {$exists: true, $not: {$size: 0}} }).count();
```

Count blogs with python in articles tags:

```javascript
db.blogs.find({ "content.tags": {$exists: true, $in: ["python"]} }).count();
```

Get all blogs with scraping in tags:

```javascript
db.blogs.find(
  { "content.tags": {$exists: true, $in: [/scraping/]} },
  { source_url: true }
);
```

Get all blogs on wordpress:

```javascript
db.blogs.find({ "imports.css": {$in: [/wp-content/]} }, { source_url: true});
```

Get all blogs with twitter bootstrap:

```javascript
db.blogs.find({ "imports.css": {$in: [/bootstrap/]} }).count();
```

List of popular tags:

```javascript
db.blogs.aggregate(
  [
    {
      $match: {"content.tags": {$not: {$size: 0}}}
    },
    {
      $project: {"content.tags": 1}
    },
    {
      $unwind: "$content.tags"
    },
    {
      $group: {
        _id: "$content.tags",
        count: {$sum: 1}
      }
    },
    {
      $sort: {count: -1}
    }
  ]
);
```

## Future plans

If my first experiment with tech blogging will be successful i'll write few
additional articles about practical web scraping and related technologies.

+ How to bootstrap REST service around your scrapers?
+ Effective way to remove duplicates using Bloom filtering
+ How to parse HUGE website like booking.com?
+ Grab with Celery
+ Effective way to build Data Driven Websites

For Grab framework itself, there is many things author working, one is - API
interface to real time information from scrapers. It's really cool since it
would be possible to build some additional infrastructure - deploying system,
Admin/Web interface. Also, author keep with Transport layer and probably new
shinny transport based on AsyncIO will be implemented.
