export async function fetchPreview(platform, mediaUrl) {
  const res = await fetch(
    `/api/downloader?preview=1&platform=${platform}&url=${encodeURIComponent(
      mediaUrl
    )}`
  );
  if (!res.ok) throw new Error("Preview gagal");
  return res.json();
}
