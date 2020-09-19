/**
 * A class with functions on the dispatch side and the listen side.
 */
export class EventEmitter {
  constructor() {
    this._listeners = new Map();
  }

  /**
   * Register a listener function that will be called when the specified event
   * is executed.
   * @param {string} type event name
   * @param {Function} listener Event listener
   */
  addEventListener(type, listener) {
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Set());
    }
    const listenerSet = this._listeners.get(type);
    listenerSet.add(listener);
  }

  /**
   * Dispatch the specified event.
   * @param {string} type event name
   */
  emit(type) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(listener => {
      listener.call(this);
    });
  }

  /**
   * Cancels the event listener for the specified event.
   * @param {string} type event name
   * @param {Function} listener Event listener
   */
  removeEventListener(type, listener) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(ownListener => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}
