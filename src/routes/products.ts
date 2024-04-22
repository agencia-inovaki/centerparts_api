import express from 'express'
import { auth } from '../middleware/auth'
import { createProductController } from '../useCases/Products/CreateProduct'
import { deleteProductController } from '../useCases/Products/DeleteProduct'
import { getAllProductsController } from '../useCases/Products/GetAllProducts'
import { getOneProductController } from '../useCases/Products/GetOneProduct'

export const productRouter = express.Router()

productRouter
  .post(
    '/product',
    auth,
    async (request, response) => {
      await createProductController.handle(request, response)
    }
  )
  .delete('/product/:id', auth, async (request, response) => {
    await deleteProductController.handle(request, response)
  })
  .get('/products/:bannerId', async (request, response) => {
    await getAllProductsController.handle(request, response)
  })
  .get('/product/:id', async (request, response) => {
    await getOneProductController.handle(request, response)
  })
