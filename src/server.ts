import { env } from "./config/env.js";
import app from "./app.js";
import { setupGracefulShutdown } from "./utils/shutdown.js";
import { setupProcessHandlers } from "./utils/processHandler.js";

const port = env.port;

const server = app.listen(port, () => {
    console.log(`server running on port ${port}`);
});

setupGracefulShutdown(server);
setupProcessHandlers();