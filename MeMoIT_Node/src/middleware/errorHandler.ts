// src/middleware/errorHandler.ts
import { type Request, type Response, type NextFunction } from "express";

interface HttpError extends Error {
    status? : number;
}

export function errorHandler(
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(`[Error] ${err.message}`);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Interanl Server Error",
    });
}