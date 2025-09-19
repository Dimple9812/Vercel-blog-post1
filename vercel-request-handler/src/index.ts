import express from "express";
import pkg from 'aws-sdk';
const { S3 } = pkg;
const s3 = new S3({
    accessKeyId: "e55594f5020b323dc09b2d111a002cb2",
    secretAccessKey: "7008472f9afe21d3029cc5d144af7626dcb22dda43e6c8ecd9c40e96f948d846",
    endpoint: "https://d20ba932f91118750ccfe8574c2acf75.r2.cloudflarestorage.com"
})

const app = express();

app.get("/*", async (req, res) => {
    // id.100xdevs.com
    const host = req.hostname;

    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001);