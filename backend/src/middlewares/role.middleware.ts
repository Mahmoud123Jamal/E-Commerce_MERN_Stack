import { Request, Response, NextFunction } from "express";

export const authRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req?.user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({
        status: "fail",
        data: { message: "You are not authorized to perform this action" },
      });
    }

    next();
  };
};
