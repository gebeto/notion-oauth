const fetch = require("@vercel/fetch")(require("node-fetch"));

module.exports = async (req, res) => {
  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? `http://${process.env.VERCEL_URL}/api/notion`
      : `https://notion-ouath.vercel.app/api/notion`;
  const notionId = process.env.NOTION_APP_ID;
  const notionSecret = process.env.NOTION_APP_SECRET;

  if (req.query.env) {
    res.json({ NODE_ENV: process.env.NODE_ENV });
    return;
  }

  if (req.query.code) {
    const result = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${notionId}:${notionSecret}`).toString("base64"),
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: redirectUrl,
      }),
    }).then((res) => res.json());
    res.json({ message: result, data: req.query });
    return;
  } else {
    const notionRedirect = new URL("https://www.notion.so/install-integration");
    notionRedirect.searchParams.append("owner", "user");
    notionRedirect.searchParams.append("response_type", "code");
    notionRedirect.searchParams.append("client_id", notionId);
    notionRedirect.searchParams.append("redirect_uri", redirectUrl);
    res.redirect(notionRedirect.toString());
  }
};
