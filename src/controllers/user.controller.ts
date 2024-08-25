import { Handler, Request, RequestHandler } from 'express'
import logger from '../utils/logger'
import { createUser } from '../services/user.service'
import { CreateUserInput } from '../schemas/user.schema'
import { omit } from 'lodash'

export const createUserHandler: Handler = async (
  req: Request<{}, {}, CreateUserInput['body']>,
  res
) => {
  try {
    const user = await createUser(req.body)
    return res.send(omit(user.toJSON(), 'password'))
  } catch (e: any) {
    logger.error(e)
    return res.status(409).send(e.message)
  }
}
