/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BaseResponse } from '../constant/base-response';
import { StatusCode } from '../constant/statusCode';
const validateRequest = (DtoClass: any, covertArray?: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (covertArray) {
        const item = req.body[covertArray];
        if (!Array.isArray(req.body[covertArray])) {
          req.body[covertArray] = [item];
        }
        if (!item) {
          req.body[covertArray] = [];
        }
      }
      const dtoObject = plainToInstance(DtoClass, req.body);
      const errors = await validate(dtoObject);
      if (errors.length > 0) {
        return BaseResponse.new(
          res,
          StatusCode.BadRequest,
          req.t('validation:error'),
          errors
        ).send();
      }

      next();
    } catch (error) {
      return BaseResponse.new(
        res,
        StatusCode.InternalServerError,
        req.t('internal_server_error'),
        error
      ).send();
    }
  };
};

export default validateRequest;
