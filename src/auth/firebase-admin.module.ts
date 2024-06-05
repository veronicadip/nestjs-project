import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin";

const init = async () => {
    const configService = await new ConfigService();
    const projectId = configService.get("FIREBASE_PROJECT_ID");
    const clientEmail = configService.get("FIREBASE_CLIENT_EMAIL");
    const privateKey = configService.get("FIREBASE_PRIVATE_KEY").replace(/\\n/g, '\n');

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: projectId,
            clientEmail: clientEmail,
            privateKey: privateKey,
        })
    })
}

init();

export { admin };