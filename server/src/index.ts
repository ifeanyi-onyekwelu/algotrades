import "module-alias/register";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import session from "express-session";

import dbConn from "./config/dbConn";
import EmailService from "./utils/mailer";
import { logData, logError } from "./utils/logger";
import { NotFoundError } from "./utils/errors";
import corsOptions from "./config/corsOptions";

import "./profitCronJob";

export const emailService = new EmailService();

config();
dbConn().then((r) => console.log("MongoDB Connected"));

const app = express();
const PORT = process.env.PORT || 3333;
const sessionSecret =
    process.env.SESSION_SECRET || "dlwkdnkcwednacnweodj83842efnckd";

process.env.TZ = "Africa/Lagos";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);

app.use("^/$", (req: express.Request, res: express.Response) => {
    return logData(res, 200, { message: "API Running!" });
});

import apiRoutes from "./routes/index.routes";
app.use("/api/v1", apiRoutes);

app.all("*", (req: express.Request, res: express.Response) => {
    return logError(res, new NotFoundError("Resource not found!"));
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
