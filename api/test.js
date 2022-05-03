const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const result = await fetch(`https://httpbin.org/get`);
  result.body.pipe(res);
};
