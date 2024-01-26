import { Request, Response,NextFunction } from 'express';
import { Session } from '../Interfaces/userInterface';
import * as userService from '../Services/userService';

export const checkSessionKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authorizationHeader = req.headers['authorization'];

      const result = await userService.checkSessionKey(authorizationHeader) as Session ;

      if (!result) {
        throw {
          code: 401,
          message: 'Invalid session data',
        };
      }
  
  
      if (new Date() > result.expiry_date) {
        throw {
          code: 401,
          message: 'Session expired',
        };
      }
  
  
      // Set session in req if needed
      req.session = result;
  
      next();
    } catch (error:any) {
      const statusCode = error.code || 500;
      res.status(statusCode).json({ error: error.message });
    }
  };