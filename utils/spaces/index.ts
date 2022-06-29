import {
    CreateBucketCommand,
    ListBucketsCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    endpoint: "https://sgp1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
    region: "sgp1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
    // endpoint: "https://long-space.sgp1.digitaloceanspaces.com",

    credentials: {
        accessKeyId: "OZMG7XXNT64EPKWZYSVM", // Access key pair. You can create access key pairs using the control panel or API.
        secretAccessKey: "2EixS2Z731G/YnJLVOZ4xi7rxmRRt+mHMzqdyozilyk", // Secret access key defined through an environment variable.
    },
});
// export const s3Client = new S3Client({
//     endpoint: process.env.SPACE_URL, // Find your endpoint in the control panel, under Settings. Prepend "https://".
//     region: process.env.SPACE_REGION, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
//     credentials: {
//         accessKeyId: process.env.ACCESS_KEY_ID || "", // Access key pair. You can create access key pairs using the control panel or API.
//         secretAccessKey: process.env.SECRET_ACCESS_KEY || "", // Secret access key defined through an environment variable.
//     },
// });

export const uploadFileS3 = async (filename: string, data: any) => {

    const data1 = await s3Client.send(new CreateBucketCommand({ Bucket: "example-space-name" }));
    // const data1 = await s3Client.send(
    //     new ListBucketsCommand({ Bucket: "long-space" })
    // );
    console.log("Success", data.Buckets);
    return;
    const params = {
        Bucket: "long-space", // The path to the directory you want to upload the object to, starting with your Space name.
        Key: "filename.txt", // Object key, referenced whenever you want to access this file later.
        Body: data, // The object's contents. This variable is an object, not a string.
        ACL: "public", // Defines ACL permissions, such as private or public.
        Metadata: {
            // Defines metadata tags.
        },
    };

    // Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
    try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log(
            "Successfully uploaded object: " + params.Bucket + "/" + params.Key
        );
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};
