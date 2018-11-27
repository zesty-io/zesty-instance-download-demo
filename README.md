# Zesty Instance Download

## Introduction

Example code that shows one way of downloading files from a Zesty.io instance to the local filesystem.

This will download:

* Views (including AJAX and Endpoint views).
* Stylesheets.
* Scripts.

This will not currently download:

* Linked stylesheet and JavaScript resources (those which show with a planet icon in the Zesty.io Editor).

## Setup

To set this up you'll need to clone the repo, install dependencies, then set some environment variables.

You will need the following information about your Zesty instance:

* Instance ZUID.
* Access token.

These items can be obtained from the "External Editing" tab in your Zesty.io instance's Editor.  Note that the access token is session based, and will expire when you logout or after a period of inactivity on Zesty.io.

To get started:

```
$ git clone https://github.com/zesty-io/zesty-instance-download-demo.git
$ cd zesty-instance-download-demo
$ npm install
$ export ZESTY_INSTANCE_ZUID=<your instance ZUID>
$ export ZESTY_ACCESS_TOKEN=<your access token>
$ npm start
```

## Results

Downloaded files will be placed into a folder called `output`.  Inside that you can expect to find further folders:

* `views`: Contains view templates from your instance.  If you are using endpoints with fully qualified paths, these will be placed in nested folders e.g. `/very/deep/path/item.json` will be found in `views/very/deep/path/item.json`.
* `styles`: Contains CSS, LESS or SCSS files from your instance.
* `js`: Contains JavaScript files from your instance.

Note, this script will pull the `dev` (unpublished) versions of these files.  You may also wish to pull the `live` versions (published).  To do this, edit `index.js` and change:

```
const ENVIRONMENT_TO_USE = 'dev'
```

to

```
const ENVIRONMENT_TO_USE = 'live'
```
