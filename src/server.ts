import { env } from "./config/env.js";
import app from "./app.js";
import { setupGracefulShutdown } from "./utils/shutdown.js";
import { setupProcessHandlers } from "./utils/processHandler.js";
import { transporter } from "./config/mail.js";

const port = env.port;

const server = app.listen(port, async () => {
    console.log(`server running on port ${port}`);
    
    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");
    } catch (err) {
        console.error("Verification failed:", err);
    }
});

setupGracefulShutdown(server);
setupProcessHandlers();