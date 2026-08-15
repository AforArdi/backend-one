import multer from "multer";
import type { Request } from "express";

const storage = multer.memoryStorage()
const fileFilter: multer.Options['fileFilter'] = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Invalid file type"))
    }

}

export const upload = multer({
    storage: storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})