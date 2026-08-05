export const setupProcessHandlers = () => {
    process.on(
        "uncaughtException",
        (error) => {

            console.error("UNCAUGHT EXCEPTION:", error);
            process.exit(1);

        });

    process.on(
        "unhandledRejection",
        (error) => {

            console.error("UNHANDLED REJECTION:", error);
            process.exit(1);

        });

};