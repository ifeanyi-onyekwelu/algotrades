import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "../utils/Types";
import { InternalServerError, UnauthorizedError } from "../utils/errors";
import { logError } from "../utils/logger";

const authGuard = (req: Request | any, res: Response, next: NextFunction) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (!token) return logError(res, new UnauthorizedError("Not logged in"));

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET!,
        (err: any, decoded: any) => {
            if (err) return logError(res, new InternalServerError(`${err}`));

            req.session.user = decoded?.user;
            next();
        }
    );
};

export default authGuard;
