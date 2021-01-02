var unirest = require("unirest");
const translate = async (string) => {
  console.log(string);
  var req = unirest(
    "POST",
    "https://microsoft-translator-text.p.rapidapi.com/translate"
  );

  req.query({
    to: "en",
    "api-version": "3.0",
    profanityAction: "NoAction",
    textType: "plain",
  });

  req.headers({
    "content-type": "application/json",
    "x-rapidapi-key": "fd6198bafbmshe5c791007c10f6fp13baa6jsnb3cc94e4d76b",
    "x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
    useQueryString: true,
  });

  req.type("json");
  req.send([
    {
      Text: string,
    },
  ]);
  let result;
  await req.end(function (res) {
    if (res.error) throw new Error(res.error);
    // console.log(res.body[0]);

    return (result = res.body[0].translations[0].text);
  });
  return result;
};

module.exports = translate;
