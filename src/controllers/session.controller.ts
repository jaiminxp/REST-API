import { Handler } from 'express'
import { validatePassword } from '../services/user.service'
import { createSession } from '../services/session.service'
import { signJwt } from '../utils/jwt.utils'
import config from 'config'

export const createUserSessionHandler: Handler = async (req, res) => {
  // validate user's password
  const user = await validatePassword(req.body)

  if (!user) {
    return res.status(401).send('Invalid email or password')
  }
  // create a session
  const session = await createSession(
    user._id as string,
    req.get('user-agent') || ''
  )

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>('accessTokenTtl') }
  )

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get<string>('refreshTokenTtl') }
  )

  // return tokens
  return res.send({ accessToken, refreshToken })
}
