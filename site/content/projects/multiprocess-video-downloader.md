+++
date = "2017-06-11T02:01:20+07:00"
description = "Downloader of videos from 10 porn-tube websites"
final_result = "video downloaders and control dashboard"
pages_crawled = 1000000
title = "Multiprocess video downloader"
+++
Customer wanted to fill hist own audlt tube-network using selected content from
other tubes. I made crawlers and control dashboard where user able to upload
`csv` file with urls to videos and push **run** button. Downloaded media content
served using nginx and used by 3rd party software. `csv` file with meta
information about each downloaded video available on dashboard.

- Technology stack used: Flask + Celery + Redis
- Average media volume: 30Gb per day.

Implemented careful distribution of tasks among CPU-cores, tasks list and
crawlers status displayed on dashboard.

P.S. After 1 year customer contacted me on skype and asked to fix minor issue
(had to restart redis). He told me he used system i made for about 1 year without
any problems i.e. 1 year without any maintanance.
