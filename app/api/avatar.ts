import { BlitzApiRequest, BlitzApiResponse } from "@blitzjs/core"
import multer from "multer"
import path from "path"

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, path.join(process.cwd(), "public"))
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
//   },
// })

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "public"),
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
})

// const upload = multer({ storage, onError(err, next) {
//   console.log('error', err);
//   next(err);
// } })

type BlitzApiRequestWithFormData = BlitzApiRequest & {
  file: any[]
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const avatarUpload = (req: BlitzApiRequestWithFormData, res: BlitzApiResponse) => {
  upload.single("avatar")(req, {}, (err) => {
    console.log(err)
    console.log(req.file) // do something with the files here
    res.status(200).json({ path: req.file.path })
  })
}
export default avatarUpload
