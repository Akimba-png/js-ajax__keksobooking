class Storage {
  constructor() {
    this._ads = [];
    this._observers = new Set();
  }

  setAd(ad) {
    this._ads = [...this._ads, ...ad];
    this._notify();
  }

  getAds() {
    return this._ads;
  }

  addObserver(cb) {
    this._observers.add(cb);
  }

  _notify() {
    this._observers.forEach((cb) => cb());
  }
}

export const storage = new Storage();
