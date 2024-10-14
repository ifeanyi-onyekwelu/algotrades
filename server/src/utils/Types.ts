import express from "express";

export type Request = express.Request | any;
export type Response = express.Response | any;
export type NextFunction = express.NextFunction | any;
