const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/convert", async (req, res) => {
  const url = req.query.url;
  const affiliateId = "17344450072";

  try {
    const response = await fetch(url, { redirect: "follow" });
    const finalUrl = response.url;

    const match = finalUrl.match(/product\/(\d+)\/(\d+)/);

    if (!match) {
      return res.json({ error: "Không lấy được ID" });
    }

    const shopid = match[1];
    const productid = match[2];

    const affLink =
      "https://s.shopee.vn/an_redir?origin_link=" +
      encodeURIComponent(`https://shopee.vn/product/${shopid}/${productid}`) +
      "&affiliate_id=" +
      affiliateId;

    res.json({ shopid, productid, affLink });

  } catch (err) {
    res.json({ error: "Lỗi xử lý link" });
  }
});

app.listen(PORT, () => {
  console.log("Server running...");
});
