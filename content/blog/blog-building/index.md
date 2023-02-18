---
title: 'Building My Blog'
excerpt: "What I'm using for my blog and how I'm making it easier to access."
date: 2023-02-11
category:
  - personal
---

As I start posting here more, I've been adding some functionality to my site and decided to write about it a bit. My site's code is [available on GitHub](https://github.com/cspivack/craigspivack.com), but I think it's interesting (for myself, at least) to go into the decisions I've made.

I'm using the [@nuxt/content](https://content.nuxtjs.org/) module for my blog, and I've been liking it so far. I've used [Prismic](https://prismic.io/) as the CMS for Nuxt blog sites in the past, but it's nice to be able to edit in a Markdown file.

The module makes it dead-simple to set up code highlighting using [Shiki](https://github.com/shikijs/shiki). I use Sublime Text for code editing, and the [code block styling here](/blog/nginx-internal-redirects) matches my personal setup: Monokai as the theme, with Victor Mono SemiBold as the font face (I actually use `#2d2a2e` as the background color in Sublime, but that doesn't pass WCAG contrast requirements!).

At a friend's encouragement, I've also implemented an [RSS feed for my blog](/blog/rss.xml). I used [these](https://mokkapps.de/blog/create-an-rss-feed-with-nuxt-3-and-nuxt-content-v2/) [posts](https://journal.maciejpedzi.ch/generating-rss-feeds-for-a-nuxt-content-site) as resources for getting that implemented.

Social media has gone down the path of centralization and walled gardens over the last 15 years, to the point where apps like [Hive Social](https://www.hivesocial.app/) don't even give you a URL for posts. That is anathema to what the open web is all about.

As always, it's not enough to just talk about what's wrong, you've gotta walk the walk. I'm making it my goal to support open protocols wherever I can, so that whatever I put out into the world is readable in whatever format you want. Thank you to [Colin](https://colin.mahns.net/) for nudging me to get that done.