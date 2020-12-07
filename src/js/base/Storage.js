export default class Storage {
  constructor(type) {
    if (this.isStorageAvailable(type)) {
      this.storage = type === 'localStorage' ? localStorage : sessionStorage;
    } else {
      throw new Error(`Storage ${type} unavailable!`);
    }
  }

  set(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      if (e) {
        alert('Limit is exceeded');
      }
    }
  }

  get(key) {
    return JSON.parse(this.storage.getItem(key));
  }

  isStorageAvailable(type) {
    try {
      const storage = window[type];
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }
}
