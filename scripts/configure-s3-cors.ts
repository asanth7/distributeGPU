
import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import * as dotenv from "dotenv";

dotenv.config();

const client = new S3Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.AWS_SECRET_KEY || "",
    },
});

const bucketName = process.env.S3_BUCKET_NAME;

if (!bucketName) {
    console.error("Error: S3_BUCKET_NAME is not set in .env");
    process.exit(1);
}

const run = async () => {
    console.log(`Configuring CORS for bucket: ${bucketName}...`);

    try {
        const command = new PutBucketCorsCommand({
            Bucket: bucketName,
            CORSConfiguration: {
                CORSRules: [
                    {
                        AllowedHeaders: ["*"],
                        AllowedMethods: ["GET", "PUT", "POST", "HEAD"],
                        AllowedOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"], // Allow localhost
                        ExposeHeaders: ["ETag"],
                        MaxAgeSeconds: 3600,
                    },
                ],
            },
        });

        await client.send(command);
        console.log("Successfully configured CORS!");
    } catch (err) {
        console.error("Error configuring CORS:", err);
    }
};

run();
