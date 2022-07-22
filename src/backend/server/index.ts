import express from 'express'
import Next from 'next'
import accountController from '../controllers/accountController'
import mongoose from 'mongoose'

const port = 3000;
const app = Next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(express.urlencoded({ extended: true }), express.json())

  server.get('/api/account/', accountController.readAll)
  server.get('/api/account/find', accountController.read)
  server.post('/api/account/', accountController.write)
  server.delete('/api/account/:userId', accountController.delete)

  server.all('*', (req, res) => handle(req, res))

  server.listen(port, () => {
    console.log(`Ready on http://localhost:${port}`)
  })

  mongoose.Promise = global.Promise
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', () => {
    console.log('connected to mongo DB server')
  })
  mongoose.connect('mongodb://localhost/discordbots')

  module.exports = server
})
