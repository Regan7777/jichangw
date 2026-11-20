import fs from 'node:fs';
import path from 'node:path';

const HOST = 'https://jichangw.com';
const projectRoot = 'c:/Users/78432/Desktop/博客合集wuhan950706/jichangw.com机场网';
const postsDir = path.join(projectRoot, 'src/content/posts');
const distDir = path.join(projectRoot, 'dist');
const publicDir = path.join(projectRoot, 'public');

function formatLocalDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const todayStr = formatLocalDate(new Date());

// Read all posts
const postFiles = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
const articleUrls = [];

for (const file of postFiles) {
  const filePath = path.join(postsDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const slug = file.replace(/\.md$/, '');

  let lastmod = todayStr;
  const updatedMatch = content.match(/updatedDate:\s*([^\r\n]+)/);
  const pubMatch = content.match(/pubDate:\s*([^\r\n]+)/);

  if (updatedMatch) {
    const d = new Date(updatedMatch[1].trim());
    if (!isNaN(d.getTime())) lastmod = formatLocalDate(d);
  } else if (pubMatch) {
    const d = new Date(pubMatch[1].trim());
    if (!isNaN(d.getTime())) lastmod = formatLocalDate(d);
  }

  articleUrls.push({
    loc: `${HOST}/articles/${slug}/`,
    lastmod,
    changefreq: 'weekly',
    priority: '0.9',
  });
}

// Fixed core pages
const staticPages = [
  { loc: `${HOST}/`, lastmod: todayStr, changefreq: 'daily', priority: '1.0' },
  { loc: `${HOST}/category/pingce/`, lastmod: todayStr, changefreq: 'daily', priority: '0.8' },
  { loc: `${HOST}/category/jiaocheng/`, lastmod: todayStr, changefreq: 'daily', priority: '0.8' },
  { loc: `${HOST}/category/tools/`, lastmod: todayStr, changefreq: 'weekly', priority: '0.8' },
  { loc: `${HOST}/category/risk/`, lastmod: todayStr, changefreq: 'weekly', priority: '0.8' },
  { loc: `${HOST}/tools/`, lastmod: todayStr, changefreq: 'weekly', priority: '0.7' },
  { loc: `${HOST}/risk/`, lastmod: todayStr, changefreq: 'weekly', priority: '0.7' },
];

const allUrls = [...staticPages, ...articleUrls];

function generateSitemapXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const item of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${item.loc}</loc>\n`;
    xml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${item.changefreq}</changefreq>\n`;
    xml += `    <priority>${item.priority}</priority>\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>\n';
  return xml;
}

function generateIndexXml() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += '  <sitemap>\n';
  xml += `    <loc>${HOST}/sitemap-0.xml</loc>\n`;
  xml += `    <lastmod>${todayStr}</lastmod>\n`;
  xml += '  </sitemap>\n';
  xml += '</sitemapindex>\n';
  return xml;
}

const sitemapXml = generateSitemapXml(allUrls);
const indexXml = generateIndexXml();

// Write to dist if dist exists
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'sitemap-0.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), indexXml, 'utf-8');
}

// Also write to public
fs.writeFileSync(path.join(publicDir, 'sitemap-0.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), indexXml, 'utf-8');

console.log(`✅ Generated standardized sitemaps with ${allUrls.length} URLs and valid lastmod timestamps.`);
