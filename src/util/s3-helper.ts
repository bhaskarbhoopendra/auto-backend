import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEY!,
    secretAccessKey: process.env.AWS_SECRETACCESSKEY!,
  },
});

export const uploadToS3 = async (file: any) => {
  const fileKey = `${uuidv4()}-${file.name}`;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileKey,
    Body: file.data,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  await s3.send(command);

  // Construct the S3 URL for the uploaded file
  const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
  return { fileUrl }; // Return the URL of the uploaded file
};
export const deleteFromS3 = async (fileUrl: string) => {
  const fileKey = fileUrl.split('/').pop(); // Extract the file key from the URL
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: fileKey!,
  };

  const command = new DeleteObjectCommand(params);
  return await s3.send(command);
};
