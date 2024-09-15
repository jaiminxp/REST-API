import { Express, Request, Response } from 'express'
import { createUserHandler } from './controllers/user.controller'
import validateResource from './middleware/validateResource'
import { createUserSchema } from './schemas/user.schema'
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from './controllers/session.controller'
import { createSessionSchema } from './schemas/session.schema'
import requireUser from './middleware/requireUser'
import * as productSchemas from './schemas/product.schema'
import * as productController from './controllers/product.controller'

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

  app.post('/api/users', validateResource(createUserSchema), createUserHandler)

  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  )

  app.get('/api/sessions', requireUser, getUserSessionsHandler)

  app.delete('/api/sessions', requireUser, deleteSessionHandler)

  // products
  app.post(
    '/api/products',
    [requireUser, validateResource(productSchemas.createProductSchema)],
    productController.createProductHandler
  )

  app.put(
    '/api/products/:productId',
    [requireUser, validateResource(productSchemas.updateProductSchema)],
    productController.updateProductHandler
  )

  app.get(
    '/api/products/:productId',
    validateResource(productSchemas.getProductSchema),
    productController.getProductHandler
  )

  app.delete(
    '/api/products/:productId',
    [requireUser, validateResource(productSchemas.deleteProductSchema)],
    productController.deleteProductHandler
  )
}

export default routes
