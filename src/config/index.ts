import { Application } from "express";

import express from "express";

// For authentication
import cookieParser from "cookie-parser";

// CORS
import cors from "cors";

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:3000";

// Middleware configuration
export default (app: Application) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [FRONTEND_URL]
    })
  );
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};