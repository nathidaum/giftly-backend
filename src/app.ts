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

import cardRoutes from "./routes/card.routes";
app.use("/cards", cardRoutes);

import messageRoutes from "./routes/message.routes";
app.use("/cards", messageRoutes);

// Error handling
import errorHandling from "./error-handling";
errorHandling(app);

export default app;