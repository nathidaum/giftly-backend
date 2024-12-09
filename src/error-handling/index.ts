import { Application } from "express";
import { Request, Response, NextFunction } from 'express';

export default (app: Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Not found
    res.status(404).json({ message: "This route does not exist" });
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // always logs the next(err)
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res
        .status(500)
        .json({
          message: "Internal server error. Check the server console",
        });
    }
  });
};