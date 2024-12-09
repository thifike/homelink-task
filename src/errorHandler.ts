import { NextFunction, Request, Response } from "express";
import { ValidateError } from "tsoa";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
    return;
  }
  if (err instanceof Error) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
    return;
  }

  next();
}
