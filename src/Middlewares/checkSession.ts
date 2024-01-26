import { Request, Response,NextFunction } from 'express';

import * as userService from '../Services/userService';

export const checkSessionKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        throw {
          code: 401,
          message: 'Authorization header is missing',
        };
      }      const result = await userService.checkSessionKey(authorizationHeader);
        req.session = result;
  
      next();
    } catch (error:any) {
      const statusCode = error.code || 500;
      res.status(statusCode).json({ error: error.message });
    }
  };