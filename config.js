'use strict';

module.exports = {
  url: 'https://ronakraithatha.com',
  title: 'Ronak\'s Corner of the Internet',
  subtitle: 'Random ramblings and relatively riveting finds from my day to day.',
  copyright: '© All rights reserved.',
  disqusShortname: '',
  postsPerPage: 4,
  googleAnalyticsId: process.env.GOOGLEANALYTICSID || 'UA-90671588-2',
  menu: [
    {
      label: 'Articles',
      path: '/'
    },
    {
      label: 'About me',
      path: '/pages/about'
    },
    {
      label: 'Contact me',
      path: '/pages/contacts'
    }
  ],
  author: {
    name: 'Ronak Raithatha',
    photo: '/photo.jpg',
    bio: 'Random ramblings and relatively riveting finds from my day to day.',
    contacts: {
      email: 'ronaksraithatha@gmail.com',
      twitter: 'baronvonratata',
      github: 'ronakR'
    }
  }
};
