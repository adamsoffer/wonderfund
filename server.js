const next = require('next')
const routes = require('./lib/routes')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)

const express = require('express')
app.prepare().then(() => {
  express()
    .use(handler)
    .listen(5000, function() {
      console.log('App listening on port 5000')
    })
})
