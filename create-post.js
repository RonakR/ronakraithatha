/*eslint-disable */
const prompt = require('prompt');
const moment = require('moment');
const _ = require('underscore.string');
const yaml = require('js-yaml');
const fs = require('fs');

prompt.start();

prompt.get(['title'], (err, result) => {
  'use strict';
  const dir = './content/posts';
  const slugTitle = _.slugify(result.title);
  const fileName = `${ moment().format('YYYY-MM-DD') }---${ slugTitle }`;

  let postFileStr = '---\n';

  const frontmatter = {
    title: result.title,
    date: moment().toJSON(),
    template: 'post',
    draft: true,
    slug: `/posts/${slugTitle}`,
    category: '',
    tags: '',
    description: '',
  };

  postFileStr += yaml.safeDump(frontmatter);
  postFileStr += '---\n';

  fs.writeFileSync(`${ dir }/${ fileName }.md`, postFileStr, {
    encoding: 'utf-8',
  });

  return console.log(fileName);
})