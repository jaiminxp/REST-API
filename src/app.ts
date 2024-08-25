import express from 'express'
import config from 'config'
import connect from './utils/connect'
import logger from './utils/logger'
import routes from './routes'

const port = config.get<number>('port')

const app = express()

app.use(express.json({ limit: '50mb' }))

app.listen(port, async () => {
  logger.info(`🚀 app is listening on http://localhost:${port}`)
  await connect()
  routes(app)
})
