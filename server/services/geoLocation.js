const axios = require("axios");
const keys = require("../keys");
const geoLocation = async (data) => {
  console.log(keys.GOOGLE_API);
  return Promise.all(
    data.map(async (el, i) => {
      let latitude, longitude;
      try {
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${keys.GOOGLE_API}&input=${el.city}&inputtype=textquery&language=iw`;
        var encoded = encodeURI(url);
        const fetch = await axios.get(encoded);

        if (fetch.data.status === "ZERO_RESULTS") {
          return "no results";
        } else {
          const placeId = await fetch.data.candidates[0].place_id;
          const fetchCord = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${keys.GOOGLE_API}`
          );

          const { lat, lng } = await fetchCord.data.results[0].geometry
            .location;
          latitude = lat;
          longitude = lng;
        }
      } catch (e) {
        console.log(e);
      }
      return {
        city: el.city,
        coordinates: { lat: latitude, lng: longitude },
        price: el.price,
        rooms: el.rooms,
        link: el.link,
      };
    })
  );
};
module.exports = geoLocation;
