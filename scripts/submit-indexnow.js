// IndexNow URL submission script for jichangw.com
// Uses Node 18+ native fetch

const HOST = 'jichangw.com';

// Official verified keys
const BING_KEY = '8BEA8052606A0C15AACD9FF35D7E6180';
const YANDEX_KEY = '7ec54bed5e684bee9e50ea059b0e5538';

// All indexable canonical pages (excluding /go/ affiliate redirects)
const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/risk/`,
  `https://${HOST}/tools/`,
  `https://${HOST}/category/pingce/`,
  `https://${HOST}/category/jiaocheng/`,
  `https://${HOST}/category/tools/`,
  `https://${HOST}/category/risk/`,
  // Reviews
  `https://${HOST}/articles/2026-scientific-browsing-airport-review/`,
  `https://${HOST}/articles/shenxing-airport-review-2026/`,
  `https://${HOST}/articles/dalaoyun-airport-review-2026/`,
  `https://${HOST}/articles/shandianshu-airport-review-2026/`,
  `https://${HOST}/articles/liulianyun-airport-review-2026/`,
  `https://${HOST}/articles/huanqiuti-airport-review-2026/`,
  `https://${HOST}/articles/yunjiexian-airport-review-2026/`,
  `https://${HOST}/articles/guangshuyun-airport-review-2026/`,
  `https://${HOST}/articles/flyv-airport-review-2026/`,
  `https://${HOST}/articles/lingdongyun-airport-review-2026/`,
  // Tutorials
  `https://${HOST}/articles/clash-verge-rev-tutorial-2026/`,
  `https://${HOST}/articles/mihomo-party-tutorial-2026/`,
  `https://${HOST}/articles/sing-box-guide/`,
  `https://${HOST}/articles/shadowrocket-tutorial-2026/`,
  `https://${HOST}/articles/v2rayn-tutorial-2026/`,
  `https://${HOST}/articles/v2rayng-tutorial-2026/`,
  `https://${HOST}/articles/openclash-tutorial-2026/`
];

const TARGETS = [
  { endpoint: 'https://www.bing.com/indexnow', key: BING_KEY },
  { endpoint: 'https://api.indexnow.org/indexnow', key: BING_KEY },
  { endpoint: 'https://yandex.com/indexnow', key: YANDEX_KEY }
];

async function submitIndexNow() {
  console.log(`Submitting ${URLS.length} URLs to IndexNow (Bing / api.indexnow.org / Yandex)...`);

  for (const { endpoint, key } of TARGETS) {
    const payload = {
      host: HOST,
      key: key,
      keyLocation: `https://${HOST}/${key}.txt`,
      urlList: URLS
    };

    try {
      console.log(`Sending to: ${endpoint} (key: ${key.slice(0, 8)}...)`);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`Response status [${endpoint}]:`, response.status, response.statusText);
      if (response.status === 200 || response.status === 202) {
        console.log(`✓ Successfully submitted to ${endpoint}`);
      } else {
        const text = await response.text();
        console.log(`Server response:`, text || '(empty)');
      }
    } catch (err) {
      console.error(`Error submitting to ${endpoint}:`, err.message);
    }
  }
}

submitIndexNow();
