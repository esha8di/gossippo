import { Request, Response } from "express";
type Tmetadata = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

type TsendResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
  metadata?: Tmetadata;
};

export const sendResponse = <T>(res: Response, data: TsendResponse<T>) => {
  res.status(data.statusCode).json({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
    metadata: data.metadata || null,
  });
};