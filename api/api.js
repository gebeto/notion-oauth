const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const result = await fetch(`https://api.notion.com${req.query.path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "notion-version": req.headers["notion-version"],
      Authorization: req.headers["authorization"],
    },
    body: JSON.stringify({}),
  });
  result.body.pipe(res);
};
