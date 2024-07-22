/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCode } from './statusCode';
import { Response } from 'express';

export class BaseResponse {
  private res: Response;
  private statusCode: StatusCode;
  private message: string;
  private data: any;

  public constructor(
    res: Response,
    statusCode: StatusCode,
    message: string,
    data: any
  ) {
    this.res = res;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
  public static new(
    res: Response,
    statusCode: StatusCode,
    message: string,
    data: any
  ) {
    return new BaseResponse(res, statusCode, message, data);
  }
  public send() {
    return this.res
      .status(this.statusCode)
      .json({ message: this.message, data: this.data });
  }
}
