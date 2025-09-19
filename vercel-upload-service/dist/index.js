import express from "express";
import cors from "cors";
import { simpleGit } from "simple-git";
import { generate } from './utils.js';
import { getAllFiles } from "./file.js";
import path from "path"; //npm module
import { fileURLToPath } from "url";
import { uploadFile } from "./aws.js";
import { createClient } from "redis";
//uploadFile("dimpl/package.json" , "\Users\dimpl\vercel\tsconfig.json")
const publisher = createClient();
publisher.connect();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express(); //initialised an empty app from express module nd express is npm mod that helps u create http server
app.use(cors());
app.use(express.json()); // want to extract body from post req, need to use a middleware like express.json(body not known by express)
// initialises a single endpoint that a user can hit and it will be hit when user will put the re pull url nd clicks the submit button
app.post("/deploy", async (req, res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate();
    await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`)); //__dirname gives current dir
    const files = getAllFiles(path.join(__dirname, `output/${id}`));
    files.forEach(async (file) => {
        await uploadFile(file.slice(__dirname.length + 1), file);
    });
    publisher.lPush("build-queue", id);
    // console.log(files);
    res.json({
        id: id
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map