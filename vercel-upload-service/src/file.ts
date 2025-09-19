import fs from "fs"; //filesystem lib, files dir
import path from "path";

export const getAllFiles = (folderPath: string) => { //read all contents of dir
    // gets user/dimpl/vercel.... as input nd return all files
    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            response.push(fullFilePath);
        }
    });
    return response;
}