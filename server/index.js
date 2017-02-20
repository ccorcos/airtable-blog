const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const next = require('next')
const Airtable = require('./airtable')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const db = new Airtable(
  process.env.AIRTABLE_API_KEY,
  process.env.AIRTABLE_BASE_NAME
)

app.prepare()
.then(() => {
  const server = express()
  server.use(morgan(dev ? 'dev' : 'common'))
  server.use(bodyParser.json({limit: '50mb'}))

  server.get('/api/v1/posts', (req, res) => {
    db.list('Posts', {
      pageSize: 10,
      fields: ['Name', 'Date Published'],
      cursor: req.query.cursor,
    })
    .then(result => res.json(result))
  })

  server.post('/api/v1/login', (req, res) => {
    if (req.body.password === process.env.PASSWORD) {
      res.json({auth: true})
      return
    }
    res.json({auth: false})
  })

  server.post('/api/v1/posts', (req, res) => {
    if (req.body.password !== process.env.PASSWORD) {
      res.send(401)
      return
    }
    delete req.body.password
    db.create('Posts', req.body)
    .then(result => res.json(result))
  })

  server.get('/api/v1/posts/:id', (req, res) => {
    db.get('Posts', req.params.id)
    .then(result => res.json(result))
  })

  server.post('/api/v1/posts/:id', (req, res) => {
    if (req.body.password !== process.env.PASSWORD) {
      res.send(401)
      return
    }
    delete req.body.password
    db.get('Posts', req.params.id, req.body)
    .then(result => res.json(result))
  })

  server.get('/posts/:id', (req, res) => {
    return app.render(req, res, '/post', req.params)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
