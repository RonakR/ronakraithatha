---
title: Making of the old Blog (Gatsby v0.7)
date: '2019-03-12T00:50:53.251Z'
template: post
draft: false
slug: /posts/making-of-the-old-blog
category: 'Frontend'
tags: 
  - Gatsby
  - Github
  - Github Pages
description: 'This post is from the old version of my blog, which ran on Gatsby v0.7. There is an updated post named Making of this Blog (Gatsby v2).'
---

For a while, I've been wanting to create a place where I can post tidbits of information I've learned through my days, both at work and outside. I set up a couple of static site generators trying to find one I like working with. I tested with [Jekyll](https://jekyllrb.com/), [Middleman](https://middlemanapp.com/), [Hexo](https://hexo.io/) and finally landed on [Gatsby](https://www.staticgen.com/gatsby) after coming across it on [risingstars2016](https://risingstars2016.js.org/).

In this post I'm going to demonstrate:
1. Setting up Gatsby
2. Adding a theme
3. Creating a new post
4. Push blog to GitHub
5. Host blog on GitHub Pages
6. Redirect GitHub Pages to a custom domain


## Setting up Gatsby

Getting started with Gatsby was incredibly simple, the documentation on their [README](https://github.com/gatsbyjs/gatsby/blob/master/README.md) is in part to thank for that.

- Start off by globally installing Gatsby: `npm install -g gatsby`

- Create a new blog: `gatsby new my-blog`

- Change directory to the generated folder: `cd my-blog`

- Run Gatsby in develop mode: `gatsby develop`

At this point you should see:
```
Server started successfully!
Listening at:
   http://0.0.0.0:8000
```
You should see the Gatsby blog on your `localhost:8000` with the default theme.

## Adding a theme

Gatsby's repo has starter themes in the `Gatsby Starters` section of the README.

After going through a couple of the themes in that section I landed on  [Lumen](https://github.com/wpioneer/gatsby-starter-lumen).

To use this theme we'll have to create another blog and apply the theme from the start. After we do this we will have no need for the blog we created up there.

- Change directory to parent folder: `cd ..`

- Delete my-blog: `rm -r my-blog`

- Create a new blog with Lumen theme: `gatsby new my-blog https://github.com/wpioneer/gatsby-starter-lumen`

- Change directory to generated folder `cd blog`

- Run Gatsby in develop mode: `gatsby develop`

The blog should be on `localhost:8000` again, with the Lumen theme. Go ahead and open this folder in your editor of choice.

Now, let's personalize this site to have more content about you. Right off the bat you'll notice the site title is generic, that picture's not yours, there is dummy text in the description, about me, and contact me, and there may be some extra icons in the 'Social' area than you need.

Most of these can be tackled in the `config.toml` file in your root project directory. Update the `site-title`, `siteDescr`, and `siteAuthor`. As for the social site, URLs add links to the ones that matter to you, and for the rest, you can choose to delete them or leave the `#`. Google analytics ID you can choose to add if you have one and we'll talk about the `linkPrefix` later.

Having added links to social media, it's time we updated the page to reflect that change. Open `components/SiteLinks/index.jsx` and update the list there to only show the links you require.

Next, we'll the contents of the blog. Starting with the 'About me' and 'Contact Me' pages, the code to which can be found in the `index.jsx` file under `pages/pages/about` and `pages/pages/contact` respectively. As for the blogs, they are located under `pages/articles`. If you decide to get rid of the blogs, in the next section I have a script that creates a new post for you.


## Creating a new post

It's quite arduous creating a blog post, especially with the date format in the file and the folder name. I searched around Gatsby to see if they had an auto-create but couldn't find anything. I did however run into this [script](https://github.com/pamo/pamo.github.io/blob/development/new_post.js), pretty solid script. I made a couple additions to include a couple more details, here is my script:

```Javascript
const prompt = require('prompt')
const mkdirp = require('mkdirp')
const moment = require('moment')
const _ = require('underscore.string')
const yaml = require('js-yaml')
const fs = require('fs')

prompt.start()

/*eslint-disable */
prompt.get(['title', 'path', 'category', 'description'], (err, result) => {
  'use strict'
  const dir = `./pages/articles/${ moment().format('YYYY-MM-DD') }-${ _.slugify(result.path) }`
  mkdirp.sync(dir)

  let postFileStr = '---\n'

  const frontmatter = {
    title: result.title,
    date: moment().toJSON(),
    layout: 'post',
    draft: true,
    path: `/${result.path}/`,
    category: result.category,
    description: result.description,
  }

  postFileStr += yaml.safeDump(frontmatter)
  postFileStr += '---\n'

  fs.writeFileSync(`${ dir }/index.md`, postFileStr, {
    encoding: 'utf-8',
  })

  return console.log(dir);
})
```

This script is also in [my repo](https://github.com/RonakR/ronakraithatha.github.io/blob/master/new_post.js), incase you need to check if it's up to date.

Run the script in your terminal with: `node <file_name>.js`

Follow the prompts and viola, a new folder and post with the frontmatter will be added to your `pages/articles`.

## Push blog to GitHub

Github is where the blog will version controlled and hosted from. In this section we'll cover how to get the blog under version control, we'll look into hosting in the coming sections.

To get started you will need a GitHub account, you can create that by visiting [GitHub](https://www.github.com). Next you'll create a new repository on there by clicking the `+` button next to your profile picture on the top right. Enter the name for your repository here - I would suggest `blog` to make things easier down the road - add a small description for now (you can change that later), public repository is fine for now. Click on `Create repository` leaving the initialize checkbox unchecked.

**NOTE:** If you're new to GitHub or need a quick refresher, I suggest skimming through [this quick guide](http://rogerdudler.github.io/git-guide/) first.

You will be directed to a page with some instructions, follow the instructions under `…or create a new repository on the command line`, except echo `"# test-site" >> README.md` and instead of `git add README.md` you will, just this one time, use `git add .` to add all files.

Here's a quick recap of what each step does:

- `git init` Initializes a repository in the current folder

- `git add .` Adds all changed files to the staging area

- `git commit -m "first commit"` Creates a commit for all files in the staging area. Commits are the most integral part of Git, and always require a commit message.

- `git remote add origin <URL>` Notifies your git instance that `URL` is the place in the location in the internet where it can send/receives changes; it's aliased to `origin` by convention. Also of note, `local` means your machine and `remote` means a location somewhere else on the internet, which in our case is GitHub's servers.

- `git push -u origin master` Pushes any commits on your local machine to the remote location specified at `origin`. `master` is the conventional name for the fist branch in your repo.

That's it, now refresh that GitHub page and you should see your files from your blog folder appear on GitHub. Now you can use the above steps: `add`, `commit`, `push` to keep your GitHub up to date with the changes you make locally.

## Host blog on GitHub Pages

GitHub provides a service where it will host static files and display them as webpages through their domain.

The gist of GitHub Pages is you can add a static `html` file with other supporting files to either `master` or `gh-pages` branch and it will be hosted on GitHub under `<username>.github.io/<repo_name>`. You can read more about it [here](https://pages.github.com/). Generally you want to host from `gh-pages` since master will be used for development code, not static files.

Now is also the time to change the `linkPrefix` in the `config.toml` to `/<repo_name>`.

There is a script in the `package.json` file in the root directory of the blog named `deploy`. It looks like this:
```JSON
"scripts": {
  ...,
  "deploy": "gatsby build --prefix-links && gh-pages -d public"
 },
```
That link used the [gh-pages npm library](https://www.npmjs.com/package/gh-pages) to publish files to a `gh-pages` branch on the repo.

Dissecting that script will help better understand it. The first part `gatsby build --prefix-links` builds the blog (taking into accoutnt he `linkPrefix`) and that build is stored in `/public`. `gh-pages -d public` then takes the contents of `/public` and creates a `gh-pages` with them.

To run the script from the `package.json` type `npm run <script_name>` in the CLI. In this case it will be: `npm run deploy`

Voila, if everything went without a hitch, visit `<username>.github.io/<repo_name>` to see your blog. At this point you have a blog on the internet. Go forth and write about your day-to-day escapades. Remember to keep your repository on GitHub up to date.

## Redirect GitHub Pages to a custom domain

To redirect the blog to a custom domain we'll first off need a custom domain. You can purchase these from Domain Name System (DNS) Hosting Service. I've purchased mine from [Goole Domains](https://domains.google.com/), but you can purchase one from a number of other places like [GoDaddy](https://www.godaddy.com/), [NameCheap](https://www.namecheap.com/), etc. For the following example I'll be sticking to Google Domains, but the concepts are shared between all the sites mentioned above.

First off, GitHub needs to be updated on where to direct the repository. This can be changed in the `settings` tab on the main repository page. Scroll down to `GitHub Pages`, type out the domain you purchased under the `Custom domain` section. Now if you return to the `code` tab, click on the `branches` dropdown and select `gh-pages` you'll notice there is a `CNAME` file that was recently added, the content of which is a single line with your custom domain. I'll mention more on the file further into this section.

GitHub is now aware of which domain to serve the blog from. Next we need to add a similar linking from your DNS Hosting Service to GitHub, which can be done from the control panel of your DNS Hosting Service. Visit [Goole Domains](https://domains.google.com/), login if you need to, click on the `Configure DNS` tab in the same row as your domain name, and scroll down to `Custom resource records`.

Here we will be adding a couple resource records, namely A records and CNAME records. The A record generally maps a hostname to an IP addres, in this case we'll me mapping to some IP addresses over at GitHub. The CNAME record maps an alias name to a canonical (true) domain name, i.e. maps `www` to `<username>.github.io`.

Here is an image of what these configs should look like:
![Google Domains Config](/media/domainsConfig.png)

Give a couple minutes to propagate these changes across multiple DNSs and you should see the that your custom domain now displays your blog.

But, if you notice your social icons aren't showing up, and clicking on your blog posts takes you to a page not found. Click on a blog and pay attention to the URL in the address bar, it should look something like this `<domain>/<linkPrefix>/<blogName>`. Now that the blog is running from the custom domain the linkPrefix is of no use, change it in your `config.toml` to empty quotes, run `npm run deploy` and visit your site.

Oh no, what's this?! A 404 page that says the site is not here anymore? Well, what happens when `npm run deploy` is executed is that it overwrites anything in the `gh-pages` branch with the new contents from `/public`. In doing so it also gets rid of that `CNAME` file mentioned above, this fix however is pretty simple. Go back to the `settings` tab in your repository on GitHub and add your custom domain to the the `Custom domain` section. Give it a minute and you should see your site back up on your custom domain with working links.

## Conclusion

That's it! You now have a blog and it's on you own domain. Remove the placeholder blog posts, updated the contents of the `About me` and `Contact me` pages, and keep the GitHub repository up to date. In the `config.toml` there is a stop for a `googleAnalyticsId` which you can get from [Google Analytics](https://www.google.com/analytics/). Feel free to hit me up on [Twitter](https://twitter.com/BaronVonRatata) with any questions/corrections.](For a while, I've been wanting to create a place where I can post tidbits of information I've learned through my days, both at work and outside. I set up a couple of static site generators trying to find one I like working with. I tested with [Jekyll](https://jekyllrb.com/), [Middleman](https://middlemanapp.com/), [Hexo](https://hexo.io/) and finally landed on [Gatsby](https://www.staticgen.com/gatsby) after coming across it on [risingstars2016](https://risingstars2016.js.org/).

In this post I'm going to demonstrate:
1. Setting up Gatsby
2. Adding a theme
3. Creating a new post
4. Push blog to GitHub
5. Host blog on GitHub Pages
6. Redirect GitHub Pages to a custom domain