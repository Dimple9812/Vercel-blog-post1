import { response } from "express";
import { createClient, commandOptions } from "redis";
import { downloadS3Folder } from "./aws.js";
const subscriber = createClient();
subscriber.connect();
async function main() {
    while (1) {
        const res = await subscriber.brPop(commandOptions({ isolated: true }), 'build-queue', 0);
        console.log(response);
        await downloadS3Folder(`/output/${res.element}`);
    }
}
main();
//# sourceMappingURL=index.js.map