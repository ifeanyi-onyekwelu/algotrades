import express from "express";
import { CustomError } from "./errors";

export const logData = (res: express.Response, status: number, data: any) => {
    res.status(status).json(data);
};

export const logError = (res: express.Response, error: CustomError) => {
    res.status(error.status).json({ ...error, message: error.message });
};
