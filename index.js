const { Feed } = require('feed');
const dayjs = require('dayjs');
const fs = require('fs');

const feed = new Feed({
  title: 'Hacker News daily RSS feed',
  description: 'The missing RSS feed for Hacker News daily top posts',
  link: 'https://github.com/headllines/hackernews-daily-rss',
});

const items = Array(15).fill()
  .map((_, i) => dayjs().subtract(i + 1, 'day'))
  .map(day => ({
    title: `Hacker News daily top posts @${day.format('YYYY/MM/DD')}`,
    date: day.add(1, 'day').toDate(),
    link: `https://news.ycombinator.com/front?day=${day.format('YYYY-MM-DD')}`,
  }))
  .forEach(item => feed.addItem(item));

const RSSXML = feed.rss2();
fs.writeFileSync('./rss.xml', RSSXML);
