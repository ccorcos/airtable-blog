const fetch = require('isomorphic-fetch')
const querystring = require('querystring')
const Cache = require('./cache')

const apiUrl = 'https://api.airtable.com/v0'

module.exports = class Airtable {
  constructor(apiKey, baseName) {
    this.apiKey = apiKey
    this.baseName = baseName
    this.baseUrl = `${apiUrl}/${this.baseName}/`
    this.cache = new Cache(1000 * 60 * 5)
    this.list = this.cached(this._list.bind(this))
    this.get = this.cached(this._get.bind(this))
    this.create = this.cached(this._create.bind(this))
    this.update = this.cached(this._update.bind(this))
  }
  cached(fn) {
    return (...args) => {
      const key = JSON.stringify(args)
      const value = this.cache.get(key)
      if (value) {
        return value
      }
      const result = fn(...args)
      this.cache.set(key, result)
      return result
    }
  }
  fetch(path, _options={}) {
    const url = this.baseUrl + path
    const headers = Object.assign(
      {},
      _options.headers || {},
      {Authorization: `Bearer ${this.apiKey}`}
    )
    const options = Object.assign(
      {},
      _options,
      {headers}
    )
    return fetch(url, options).then(response => response.json())
  }
  _list(table, options) {
    if (options.cursor === undefined) {
      delete options.cursor
    }
    return this.fetch(`${table}?${querystring.stringify(options)}`)
  }
  _get(table, id) {
    return this.fetch(`${table}/${id}`)
  }
  _create(table, fields) {
    return this.fetch(table, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({fields}),
    })
  }
  _update(table, id, fields) {
    return this.fetch(table, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({fields}),
    })
  }
}
