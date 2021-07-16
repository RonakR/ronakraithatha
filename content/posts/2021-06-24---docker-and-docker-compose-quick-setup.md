---
title: 'Docker and Docker Compose: Quick Setup'
date: '2021-06-24T23:18:45.209Z'
template: post
draft: true
slug: /posts/docker-and-docker-compose-quick-setup
category: 'Tooling'
tags:
  - Docker
  - Docker compose
  - Quick Setup
  - Reference
description: 'Quickly setup Docker with Docker Compose, and refresh CLI commands.'
---

- What this is and isn't
- What we're dockerizing
- Docker
- Dockerfile
- Breakdown Dockerfile and show what command is being overwritten
- - like tagging
- Docker Compose
- compose file
- breakdown
- docker compose up
- Useful tips
- Like ps for all running containers
- dc up / down & aliases
- specific logs

## What this post is and is not
### What this is:
- A quick guide to set up Docker and Docker Compose for my future self when I need to set up another container in like, 3 - 8 months.
- A reference for the most used commands I would need to run when working with containers

### What this is not:
- A deep dive into Docker, Dockerfile, and Docker Compose
- Every possible way to configure a Node or MongoDB container
- Given when you are reading this, it may not be up-to-date (although I'll be updating this as I see the need)

## What is being containerized?
By the end of this post I'll have working ExpressJS API interfacing with a locally run MongoDB instance over a shared network. This should all run with a simple `docker compose up` command.