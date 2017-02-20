module.exports = class Cache {
  constructor(timeout) {
    this.timeout = timeout
    this.cache = {}
  }
  set(key, value) {
    this.cache[key] = value
    setTimeout(() => {
      delete this.cache[key]
    }, this.timeout)
  }
  get(key) {
    return this.cache[key]
  }
}