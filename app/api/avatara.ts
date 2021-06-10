import { BlitzApiRequest, BlitzApiResponse } from "@blitzjs/core"
import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: "./public",
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  onError(err, next) {
    console.log("error", err)
    next(err)
  },
})

function runMiddleware(req: BlitzApiRequest, res: BlitzApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

type BlitzApiRequestWithFormData = BlitzApiRequest & {
  file: any[]
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const avatarUpload = async (req: BlitzApiRequestWithFormData, res: BlitzApiResponse) => {
  await runMiddleware(req, res, upload.single("avatar")) // upload.single("file") not working
  console.log(req.file)

  res.status(200).json({ path: req.file.path })
}
export default avatarUpload
