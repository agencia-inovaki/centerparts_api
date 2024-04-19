import express from 'express'
import multer from 'multer'
import { options } from '../config/multer'
import { auth } from '../middleware/auth'
import { getOneBannerController } from '../useCases/Banners/GetOneBanner'
import { getAllBannersController } from '../useCases/Banners/GetAllBanners'
import { createBannerController } from '../useCases/Banners/CreateBanner'
import { deleteBannerController } from '../useCases/Banners/DeleteBanner'
import { updateBannerController } from '../useCases/Banners/UpdateBanner'

export const bannerRouter = express.Router()

bannerRouter
  .post(
    '/banner',
    auth,
    multer(options).single('banner-photo'),
    async (request, response) => {
      await createBannerController.handle(request, response)
    }
  )
  .delete('/banner/:id', auth, async (request, response) => {
    await deleteBannerController.handle(request, response)
  })
  .put('/banner', auth, async (request, response) => {
    await updateBannerController.handle(request, response)
  })
  .get('/banners/:category', auth, async (request, response) => {
    await getAllBannersController.handle(request, response)
  })
  .get('/banner/:id', auth, async (request, response) => {
    await getOneBannerController.handle(request, response)
  })
