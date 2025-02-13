"use server";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client({
    region: process.env.S3_REGION!,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
    },
});

export default async function getPresignedUrl(file: string) {
    
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file,
    });
    
    return await getSignedUrl(client, command, { expiresIn: 60 });
}