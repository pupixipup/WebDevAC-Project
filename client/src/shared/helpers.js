export function normalizeLink(link) {
  if (typeof link !== "string") return null;
  if (link.includes("https://")) return link;
  return "https://" + link;
}
