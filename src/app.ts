// Access environment variables
import 'dotenv/config';

// Express
import express from "express";
const app = express();

// Middleware
import configMiddleware from "./config";
configMiddleware(app);

// Routes
import indexRoutes from "./routes/index.routes";
app.use("/api", indexRoutes);

// Error handling
import errorHandling from "./error-handling";
errorHandling(app);

export default app;