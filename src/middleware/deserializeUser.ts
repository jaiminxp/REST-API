import { NextFunction, Request, Response } from 'express'

import { get } from 'lodash'
import { verifyJwt } from '../utils/jwt.utils'
import { reIssueAccessToken } from '../services/session.service'

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  )

  const refreshToken = get(req, 'headers.x-refresh')

  if (!accessToken) {
    return next()
  }

  const { decoded, expired } = verifyJwt(accessToken as string)

  if (decoded) {
    res.locals.user = decoded
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({
      refreshToken: refreshToken as string,
    })

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken)
    }

    const result = verifyJwt(newAccessToken as string)

    res.locals.user = result.decoded
    return next()
  }

  return next()
}

export default deserializeUser
