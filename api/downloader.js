const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const { platform, url, res: resolution, preview } = req.query;

    if (!platform || !url) {
      res.status(400).json({ error: "platform & url required" });
      return;
    }

    let providerApi = "";

    if (platform === "instagram") {
      providerApi = `https://api.esha-api.xyz/igdl?url=${encodeURIComponent(url)}`;
    } else if (platform === "tiktok") {
      providerApi = `https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`;
    } else if (platform === "facebook") {
      providerApi = `https://api.esha-api.xyz/fbdl?url=${encodeURIComponent(url)}`;
    } else {
      res.status(400).json({ error: "unsupported platform" });
      return;
    }

    // === FETCH METADATA VIDEO ===
    const metaRes = await fetch(providerApi, { timeout: 15000 });
    if (!metaRes.ok) {
      const txt = await metaRes.text().catch(() => null);
      res.status(502).json({ error: "provider error", detail: txt });
      return;
    }

    const meta = await metaRes.json().catch(() => null);

    // PREVIEW MODE (title + duration)
    if (preview === "1") {
      return res.status(200).json({
        title: meta.title || meta.meta?.title || "Unknown",
        duration: meta.duration || meta.meta?.duration || null,
        raw: meta,
      });
    }

    const mediaUrl =
      meta.video_hd ||
      meta.video ||
      meta.download_url ||
      meta.url ||
      meta.data?.play_url ||
      null;

    if (!mediaUrl) {
      return res.status(404).json({ error: "media url not found", raw: meta });
    }

    // === STREAM VIDEO ===
    const mediaRes = await fetch(mediaUrl, { timeout: 30000 });
    if (!mediaRes.ok) {
      const t = await mediaRes.text().catch(() => null);
      return res.status(502).json({ error: "media fetch failed", detail: t });
    }

    const contentType =
      mediaRes.headers.get("content-type") || "application/octet-stream";
    const ext = contentType.includes("mp4") ? "mp4" : "bin";
    const filename = `laplace_${Date.now()}.${ext}`;

    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );
    res.setHeader("Cache-Control", "no-cache");

    const body = mediaRes.body;

    body.pipe(res);

    body.on("end", () => {
      try {
        res.end();
      } catch (e) {}
    });

    body.on("error", (err) => {
      try {
        res.destroy(err);
      } catch (e) {}
    });
  } catch (err) {
    console.error("downloader error", err);
    try {
      res
        .status(500)
        .json({ error: "internal server error", detail: err.message });
    } catch (e) {}
  }
};
