import { Request, Response,NextFunction } from 'express';

import * as userService from '../Services/userService';

export const checkSessionKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Call userService.checkSessionId with the session key from req.headers
      const result = await userService.checkSessionKey(req.headers['authorization'] as string);
  
      // Set session in req if needed
      req.session = result;
  
      next();
    } catch (error:any) {
      const statusCode = error.code || 500;
      res.status(statusCode).json({ error: error.message });
    }
  };