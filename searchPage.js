const puppeteer = require("puppeteer-extra");
const request = require("request-promise");
const cheerio = require("cheerio");
var randomUserAgent = require("user-agents");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36";

const searchPage = async (url) => {
  const apartments = [];
  const userAgent = randomUserAgent.random();
  const UA = userAgent || USER_AGENT;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setJavaScriptEnabled(true);
  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({
    width: 1920 + Math.floor(Math.random() * 100),
    height: 3000 + Math.floor(Math.random() * 100),
    deviceScaleFactor: 1,
    hasTouch: false,
    isLandscape: false,
    isMobile: false,
  });

  await page.setUserAgent(UA.toString());

  await page.goto(url);
  const html = await page.content();
  const $ = cheerio.load(html);
  console.log($(".subtitle").length);
  $(".subtitle").each((index, el) => {
    const text = $(el).text().split("").reverse().join("").split(",");
    if (text[1]) {
      apartments.push({ cityName: text[1] });
    }
  });
  //   $(".middle_col").each((index, el) => {
  //     console.log(el);
  //   });
  console.log(apartments);

  return apartments;
};
module.exports = searchPage;
