/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, NextFunction } from 'express';

export function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Sử dụng res.locals để lưu trữ dữ liệu người dùng
  res.locals.user = (req.session as any).user;
  next();
}
