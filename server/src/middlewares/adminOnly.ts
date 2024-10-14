import { Request, Response, NextFunction } from "../utils/Types";
import { ForbiddenError } from "../utils/errors";
import { logError } from "../utils/logger";

const adminOnly = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user && req.session.user.role === "admin") {
        next();
    } else {
        return logError(
            res,
            new ForbiddenError("You are not allowed to access this resource.")
        );
    }
};

export default adminOnly;
