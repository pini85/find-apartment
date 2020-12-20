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
  // await page.evaluate(() => {
  //   document.querySelector("#feed_item_0").click();
  // });

  // await page.evaluate(() => {
  //   const elements = document.querySelectorAll(".feed_item");
  //   elements.forEach((el) => {
  //     console.log(el.click());
  //   });
  // });

  const result = $(".feeditem")
    .map(async (i, el) => {
      const city = $(el)
        .find(".subtitle")
        .map((i, el) => {
          const text = $(el).text().split("").reverse().join("").split(",");
          if (text[1]) {
            return text[1];
          } else {
            return "no city";
          }
        })
        .get();
      const price = $(el).find(`#feed_item_${i}_price`).text().trim();
      const rooms = $(el).find(`#data_rooms_${i}`).text();
      const meters = $(el).find(`#data_SquareMeter_${i}`).text();
      const link = `#feed_item_${i}`;
      console.log(city[0]);
      return { city: city[0], price, rooms, meters, link };
    })
    .get();

  return result;
};
module.exports = searchPage;
//todo when there is a private cottage then take the node upper
