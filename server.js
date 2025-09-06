const express = require('express');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');

const app = express();
const PORT = 3000;

// EJS shablonlarini ulaymiz
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static fayllar (robots.txt uchun)
app.use(express.static(path.join(__dirname, 'public')));

// Bosh sahifa
app.get('/', (req, res) => {
  res.render('index');
});

// About sahifa
app.get('/about', (req, res) => {
  res.render('about');
});

// Sitemap.xml yaratamiz
app.get('/sitemap.xml', (req, res) => {
  const sitemap = new SitemapStream({ hostname: 'https://shoira-blog.uz' });
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
  sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.8 });
  sitemap.end();

  streamToPromise(sitemap).then(sm => {
    res.header('Content-Type', 'application/xml');
    res.send(sm.toString());
  });
});

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishlayapti`);
});
