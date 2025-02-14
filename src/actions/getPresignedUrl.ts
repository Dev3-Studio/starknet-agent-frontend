"use server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client({
    region: process.env.S3_REGION!,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!,
    },
    endpoint: process.env.S3_ENDPOINT!,
});

export default async function getPresignedUrl(file: string) {
    
    const command = new PutObjectCommand({
        Bucket: 'agent-forge',
        Key: file,
    });
    
    return await getSignedUrl(client, command, { expiresIn: 60 });
}