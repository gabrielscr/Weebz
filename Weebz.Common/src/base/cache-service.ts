class CacheService {
  async setCache(url: string, json: any): Promise<void> {
    if (!json)
      return;

    window.localStorage.removeItem(url);
    window.localStorage.setItem(url, JSON.stringify(json));
  }

  getCache(url: string) {
    let cache = window.localStorage.getItem(url);

    if (cache)
      try {
        return JSON.parse(cache);
      }
      catch {
        window.localStorage.removeItem(url);
      }

    return null;
  }

  removeCache(url: string) {
    window.localStorage.removeItem(url);
  }
}

export default new CacheService();
