import dayjs from 'dayjs'
import logger from 'pino'

const log = logger({
  base: { pid: false },
  timestamp: () => `,"time":"${dayjs().format()}"`,
  transport: {
    target: 'pino-pretty',
  },
})

export default log
