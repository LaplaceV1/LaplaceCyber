import React, { useState, useRef } from "react";
import { fetchPreview } from "../api/fetcher";

export default function Tools() {
  const [platform, setPlatform] = useState("instagram");
  const [url, setUrl] = useState("");
  const [resol, setResol] = useState("720p");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const iframeRef = useRef(null);

  const resolutions = ["360p", "480p", "720p", "1080p"];

  async function handlePreview() {
    try {
      setLoading(true);
      const data = await fetchPreview(platform, url);
      setPreview(data);
    } catch (e) {
      alert("Preview error: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!url) return alert("Masukkan URL dulu");

    let iframe = iframeRef.current;

    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframeRef.current = iframe;
      document.body.appendChild(iframe);
    }

    iframe.src = `/api/downloader?platform=${encodeURIComponent(
      platform
    )}&url=${encodeURIComponent(url)}&res=${encodeURIComponent(resol)}`;
  }

  return (
    <section className="py-16">
      <div className="max-w-xl mx-auto p-6 container-card rounded-xl">
        <h2 className="text-2xl font-bold mb-6 neon-title">⚡ Cyber Downloader</h2>

        <label>Platform</label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full p-3 mb-4 bg-black border border-[#00E8FF] rounded"
        >
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="facebook">Facebook</option>
        </select>

        <label>Media URL</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste link disini..."
          className="w-full p-3 mb-4 bg-black border border-[#00E8FF] rounded"
        />

        <label>Resolution</label>
        <select
          value={resol}
          onChange={(e) => setResol(e.target.value)}
          className="w-full p-3 mb-4 bg-black border border-[#C400FF] rounded"
        >
          {resolutions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <button
          onClick={handlePreview}
          className="w-full py-3 bg-[#00E8FF] text-black font-bold rounded mb-3"
        >
          {loading ? "..." : "Preview"}
        </button>

        <button
          onClick={handleDownload}
          className="w-full py-3 bg-[#C400FF] text-black font-bold rounded"
        >
          Download
        </button>

        {preview && (
          <div className="mt-6 p-4 border border-[#00E8FF] rounded">
            <div className="text-gray-300">{preview.title}</div>
            <div className="text-gray-500 text-sm">
              Duration: {preview.duration || "unknown"}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
