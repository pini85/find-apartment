const axios = require("axios");
const key =
  "pk.eyJ1IjoicGluaTg1IiwiYSI6ImNraXlxazFqaTJhN2YyeHNjbTkwODhtNzcifQ.zv-w7vb-lmerHgJQsy6EjQ";
const main = async () => {
  const data = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${key}
      `);
  console.log(data.type);
};
main();
