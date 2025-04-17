export function cachePageBeforeRedirect(key: string, value: string) {
  const cachedPage = localStorage.getItem("cachePageBeforeRedirect");
  const _cachedPage = cachedPage
    ? (JSON.parse(cachedPage) as Record<string, string>)
    : {};
  const newPageCache = { ..._cachedPage, [key]: value };
  localStorage.setItem("cachePageBeforeRedirect", JSON.stringify(newPageCache));
}

export function getCacheDPageBeforeRedirect(key: string) {
  const cachedPage = localStorage.getItem("cachePageBeforeRedirect");
  const _cachedPage = cachedPage
    ? (JSON.parse(cachedPage) as Record<string, string>)[key]
    : "/";
  return _cachedPage;
}

export function clearRedirectCache(key: string) {
  const cachedPage = localStorage.getItem("cachePageBeforeRedirect");
  const _cachedPage = cachedPage
    ? (JSON.parse(cachedPage) as Record<string, string>)
    : {};
  delete _cachedPage[key];
  localStorage.setItem("cachePageBeforeRedirect", JSON.stringify(_cachedPage));
}
