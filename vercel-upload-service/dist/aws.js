//import { S3 } from "aws-sdk";
import fs from "fs";
import pkg from 'aws-sdk';
const { S3 } = pkg;
const s3 = new S3({
    accessKeyId: "e55594f5020b323dc09b2d111a002cb2",
    secretAccessKey: "7008472f9afe21d3029cc5d144af7626dcb22dda43e6c8ecd9c40e96f948d846",
    endpoint: "https://d20ba932f91118750ccfe8574c2acf75.r2.cloudflarestorage.com"
});
// fileName => output/12312/src/App.jsx
// filePath => /Users/harkiratsingh/vercel/dist/output/12312/src/App.jsx
export const uploadFile = async (fileName, localFilePath) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName,
    }).promise();
    console.log(response);
};
//# sourceMappingURL=aws.js.map