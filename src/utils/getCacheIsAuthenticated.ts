export default function getCacheIsAuthenticated() {
  if (typeof window !== "undefined") {
    const isAuthenticatedCache = window.localStorage.getItem(
      "cacheIsAuthenticated"
    );
    if (isAuthenticatedCache) {
      const parsdIsAuthenticatedCache = JSON.parse(isAuthenticatedCache) as {
        isAuthenticated: boolean;
      };

      return parsdIsAuthenticatedCache.isAuthenticated;
    }
  }

  return false;
}
