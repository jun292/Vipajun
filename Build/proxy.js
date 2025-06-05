export default async function handler(req, res) {
  const apiKey = "xhle1Yv03kP0iOIIlc2cVthxxHkX3e2qfaoDP5Jq00QIDbEEVHI6czBZ7hLL3APp";
  const uid = "8htRcmGw";
  const sign = "afba436840d9b52b01d71e241d0fea38";
  const apiUrl = "https://vip-reseller.co.id/api/";

  const type = req.body?.type;
  const body = {
    key: apiKey,
    sign,
  };

  switch (type) {
    case "game":
      body.type = "game-feature";
      break;
    case "pricelist":
      body.type = "pricelist";
      body.category = req.body.category || "";
      break;
    case "topup":
      body.type = "order";
      body.uid = uid;
      body.buyer_sku_code = req.body.kode_produk;
      body.customer_no = req.body.tujuan;
      body.ref_id = "trx_" + Date.now();
      break;
    case "profile":
      body.type = "profile";
      break;
    case "history":
      body.type = "history";
      body.uid = uid;
      break;
    default:
      res.status(400).json({ error: "Tipe tidak dikenali" });
      return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(body),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal terhubung ke API VIPayment", detail: err.message });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
