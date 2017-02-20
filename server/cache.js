module.exports = class Cache {
  constructor(timeout) {
    this.timeout = timeout
    this.cache = {}
  }
  set(key, value) {
    this.cache[key] = value
  }
  get(key) {
    return this.cache[key]
  }
}