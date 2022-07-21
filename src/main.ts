import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';
import { AppModule } from './app.module'
import express from 'express'
//import accountController from 'controllers/accountController'
import mongoose from 'mongoose'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, 'pages', 'views'))
  console.log(join(__dirname, 'pages', 'views'))

  app.use(express.urlencoded({ extended: true }), express.json())

  /*
  app.get('/api/account/', accountController.readAll)
  app.get('/api/account/find', accountController.read)
  app.post('/api/account/', accountController.write)
  app.delete('/api/account/:userId', accountController.delete)

  app.all('*', (req, res) => handle(req, res))

  app.listen(port, () => {
    console.log(`Ready on http://localhost:${port}`)
  })
  */

  mongoose.Promise = Promise
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', () => {
    console.log('connected to mongo DB app')
  })
  mongoose.connect('mongodb://localhost/discordbots')

  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()