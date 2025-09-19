import fs from "fs"; //filesystem lib, files dir
import path from "path";
export const getAllFiles = (folderPath) => {
    // gets user/dimpl/vercel.... as input nd return all files
    let response = [];
    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath));
        }
        else {
            response.push(fullFilePath);
        }
    });
    return response;
};
//# sourceMappingURL=file.js.map