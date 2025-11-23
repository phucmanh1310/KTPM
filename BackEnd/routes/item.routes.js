// routes/item.routes.js
import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import {
  addItem,
  editItem,
  deleteItem,
  getItemById,
  getItemByCity,
} from '../controllers/item.controllers.js'
import { upload } from '../middlewares/multer.js'

const itemRouter = express.Router()

itemRouter.post('/add-item', isAuth, upload.single('image'), addItem)
itemRouter.put('/edit-item/:itemId', isAuth, upload.single('image'), editItem)
itemRouter.delete('/delete-item/:itemId', isAuth, deleteItem)
itemRouter.get('/get-by-city/:city', getItemByCity) // ← sửa route
itemRouter.get('/:itemId', isAuth, getItemById) // ← đặt cuối để tránh conflict
itemRouter.get('/test-error-500', (req, res, next) => {
  console.log('🔥 Đang tạo lỗi 500 giả lập...')
  const error = new Error('Đây là lỗi 500 cố ý để test Grafana!')
  next(error) // Chuyển lỗi xuống middleware xử lý lỗi
})
export default itemRouter
