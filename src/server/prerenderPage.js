const puppeteer = require('puppeteer');

const onRequest = (req) => {
  console.log(`[HeadlessChrome Networking]: Request with method ${req.method} to ${req.url} executed`);
}

const onRequestFailed = (req) => {
  console.log(`[HeadlessChrome Networking]: Request with method ${req.method} to ${req.url} failed with message: ${req._failureText}`);
}

const onResponse = (res) => {
  console.log(`[HeadlessChrome Networking]: Request with method ${res.method} to ${res.url} completed`);
}

module.exports = async function prerenderPage(url) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36');

    page.on('console', msg => console.log('[HeadlessChrome Console]:', msg.text));

    page.on('request', onRequest);

    page.on('requestfailed', onRequestFailed);

    page.on('response', onResponse);

    await page.goto(url, {
      waitUntil: 'networkidle0',
    });

    const renderedHtml = await page.evaluate(() => {
      console.log('[HeadlessChrome]: localUrl received by HeadlessChrome:', window.location.href);
      return document.documentElement.innerHTML;
    });

    await browser.close();

    return renderedHtml;
  } catch (e) {
      console.log(e);
      res.send("ERROR");
  }
}
