import { Request, Response } from 'express'
import {
  CreateProductInput,
  DeleteProductInput,
  ReadProductInput,
  UpdateProductInput,
} from '../schemas/product.schema'
import * as productService from '../services/product.service'

export const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response
) => {
  const userId = res.locals.user._id
  const body = req.body

  const product = await productService.createProduct({ ...body, user: userId })

  return res.send(product)
}

export const updateProductHandler = async (
  req: Request<UpdateProductInput['params'], {}, UpdateProductInput['body']>,
  res: Response
) => {
  const userId = res.locals.user._id
  const productId = req.params.productId
  const update = req.body

  const product = await productService.findProduct({ _id: productId })

  if (!product) {
    return res.sendStatus(404)
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403)
  }

  const updatedProduct = await productService.findAndUpdateProduct(
    { _id: productId },
    update,
    { new: true }
  )

  return res.send(updatedProduct)
}

export const getProductHandler = async (
  req: Request<ReadProductInput['params']>,
  res: Response
) => {
  const productId = req.params.productId

  const product = await productService.findProduct({ _id: productId })

  if (!product) {
    return res.sendStatus(404)
  }

  return res.send(product)
}

export const deleteProductHandler = async (
  req: Request<DeleteProductInput['params']>,
  res: Response
) => {
  const userId = res.locals.user._id
  const productId = req.params.productId

  const product = await productService.findProduct({ _id: productId })

  if (!product) {
    return res.sendStatus(404)
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403)
  }

  await productService.findAndDeleteProduct({ _id: productId })

  return res.sendStatus(200)
}
