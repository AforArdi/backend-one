import http from "http";


export const setupGracefulShutdown = (
    server: http.Server
) => {

    const shutdown = (signal: string) => {
        console.log('shutting down gracefully...');


        server.close(() => {
            console.log("HTTP server closed");
            process.exit(0);
        });


        setTimeout(() => {
            console.error(
                "Forced shutdown"
            );
            process.exit(1);
        }, 10000);

    };


    process.on(
        "SIGINT",
        () => shutdown("SIGINT")
    );


    process.on(
        "SIGTERM",
        () => shutdown("SIGTERM")
    );
};