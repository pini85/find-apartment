const searchPage = require("./searchPage");
const url =
  "https://www.yad2.co.il/realestate/rent?area=2&rooms=3-4&moshavimKibutzim=1&price=4000-6000";
const main = async () => {
  const x = await searchPage(url);
  console.log(x);
};
main();
