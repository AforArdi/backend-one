import sharp from "sharp";
import { r2Client } from "../config/r2.config.js";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../config/env.js";

export type ImageFolder = "rise-together-backend-class" | "posts";

export interface R2UploadOptions {
    folder: ImageFolder
}

export interface R2UploadResult {
    key: string;
    url: string;
}

const processImage = async (
    buffer: Buffer,
    options: R2UploadOptions
): Promise<R2UploadResult> => {

    const optimizedBuffer = await sharp(buffer)
        .rotate()
        .resize(1024, 1024, { fit: "inside" })
        .webp({ quality: 80 })
        .toBuffer();

    const fileName = `$ { crypto.randomUUID() }.webp`;

    const key = `${options.folder}/${fileName}`;

    await r2Client.send(
        new PutObjectCommand({
            Bucket: env.r2BucketName,
            Key: key,
            Body: optimizedBuffer,
            ContentType: "image/webp",
        }),
    );

    const url = `${env.r2PublicUrl}/${key}`;

    return { key, url };
}

// Upload a file
export const uploadImage = async (buffer: Buffer, options: R2UploadOptions) => {
    const result = await processImage(buffer, options);
    return result;
}

// delete
export const deleteImage = async (key: string) => {
    await r2Client.send(
        new DeleteObjectCommand({
            Bucket: env.r2BucketName,
            Key: key,
        }),
    );
}
