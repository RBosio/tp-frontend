import { Request, Response, Router } from 'express'
import multer from '../config/multer'
import { conn } from '../config/typeorm'
import { Product } from '../entities/product'
import { productExists } from '../middlewares/product'

const router = Router()

router.route('/:id')
  .post(productExists, multer.single('image'), async (req: Request, res: Response) => {
    const { id } = req.params
    const productRepository = conn.getRepository(Product)

    await productRepository.update(id, {image: req.file?.filename})

    res.send('ok')
  })

export default router