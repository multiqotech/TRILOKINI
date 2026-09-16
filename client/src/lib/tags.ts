function normalizeTag(value: string) {
  return value.toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

export function productMatchesTag(tags: string[] | undefined, tag: string) {
  const needle = normalizeTag(tag);
  if (!needle) return true;
  return (tags || []).some((item) => normalizeTag(item) === needle);
}

export function collectionProductsHref(title: string) {
  return `/products?tag=${encodeURIComponent(title)}`;
}
