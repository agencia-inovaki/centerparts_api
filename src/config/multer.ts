import multer, { type Options } from 'multer'
import path from 'path'

export const options: Options = {
  dest: path.join(__dirname, '..', '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, path.join(__dirname, '..', '..', '..', 'tmp', 'uploads'))
    },
    filename: (request, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`

      cb(null, filename)
    }
  }),
  fileFilter: (request, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png'
    ]

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Tipo de arquivo inválido!'))
    }
  }
}
