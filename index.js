const searchPage = require("./searchPage");
const url = "https://www.yad2.co.il/realestate/rent";
const main = async () => {
  const x = await searchPage(url);
  // console.log(x);
};
main();
