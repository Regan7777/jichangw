import fs from 'node:fs';
import path from 'node:path';

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const distDir = path.join(process.cwd(), 'dist');
const files = getHtmlFiles(distDir);
console.log('Total HTML pages found in dist:', files.length);

const report = [];

for (const file of files) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf-8');

  // H1 tag count
  const h1Matches = html.match(/<h1[\s>]/gi) || [];

  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '(NO TITLE)';

  // Meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const desc = descMatch ? descMatch[1] : '';

  // Canonical
  const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonMatch ? canonMatch[1] : '';

  // Schema LD+JSON
  const schemaMatches = html.match(/<script[^>]*type=["']application\/ld\+json["']/gi) || [];

  const issues = [];
  if (h1Matches.length === 0) issues.push('NO H1');
  if (h1Matches.length > 1) issues.push(`DUPLICATE H1 (${h1Matches.length})`);
  if (!desc) issues.push('MISSING META DESC');
  else if (desc.length < 50) issues.push(`META DESC TOO SHORT (${desc.length} chars)`);
  if (!canonical) issues.push('MISSING CANONICAL');
  if (schemaMatches.length === 0) issues.push('NO SCHEMA');

  report.push({
    url: rel.replace(/index\.html$/, '').replace(/\/$/, '') || '/',
    title: title.slice(0, 30),
    h1s: h1Matches.length,
    descChars: desc.length,
    schemas: schemaMatches.length,
    issues: issues.length ? issues.join(' | ') : '✅ PASS'
  });
}

console.log(JSON.stringify(report, null, 2));
