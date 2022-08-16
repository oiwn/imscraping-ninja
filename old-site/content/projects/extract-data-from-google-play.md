+++
date = "2016-06-12T20:22:02+07:00"
title = "Extract data from google-play"
description = "Extract valuable information about google play applications"
pages_crawled = 1000000
final_result = "PostgreSQL database dump"
+++

Scrape all google play applications with persmissions (>1mil or records).
Google Play is relatively easy to scrape, at least for basic data.

During the process i used bloom filter to abstain from duplicates crawling.

Data saved into the PostgreSQL database.
