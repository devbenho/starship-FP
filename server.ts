import {app} from './app';
import { config } from './configs/config';
import { connectToMongoDB } from './db/connect-mongo';


const startServer = async () => {
    try {
        await connectToMongoDB(); 
        const PORT = config.port;
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        // Handle unhandled promise rejections
        process.on("unhandledRejection", (err) => {
            console.log("UNHANDLED REJECTION! 💥 Shutting down...");
            server.close(() => {
                process.exit(1);
            });
        });

        // Handle SIGTERM signal
        process.on("SIGTERM", () => {
            console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
            server.close(() => {
                console.log("💥 Process terminated!");
            });
        });

    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};


startServer(); 