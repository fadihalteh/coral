import {  Request,Response ,NextFunction} from 'express';
const db = require('../models/index.ts');
import Joi from 'joi'

 interface User {
    id:number;
    username: string;
    email: string;
    password: string;
  }
  
  interface session {
    id?:number;
    session: string;
    user_id:number
  }
   interface err<T> extends Response {}

  const passwordSchema=Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().min(8).max(254)

  const baseSchema = {
    username: Joi.string().min(3).max(50),
    email: Joi.string().email().min(5).max(254),
    password:passwordSchema,
  };
  
  const createUserSchema = Joi.object({
    ...baseSchema,
  });
  
  const loginSchema = Joi.object({
    ...baseSchema,
  }).or('username', 'email')
  
  const changePasswordSchema = Joi.object({
    ...baseSchema,
    newPassword: passwordSchema
  }).or('username', 'email').with('password', 'newPassword');
  
  
  
  
  
  export const postReview = async (req, res: Response):Promise<session| err<string>> => {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { rating,comment } = value;
      const product_id = req.params.product_id;

      const existingProduct= await db.products.findOne({ where: { product_id } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'product not found' });
      }
    
      const newReview = await db.reviews.create({  user_id: req.session.user_id, product_id, rating, comment  });
      return res.status(200).json(newReview);
    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const updateReview = async (req, res: Response):Promise<session| err<string>> => {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { rating,comment } = value;
      const product_id = req.params.product_id;

      const existingProduct= await db.products.findOne({ where: { product_id, } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'product not found' });
      }
      const existingReview= await db.reviews.findOne({ where: {user_id: req.session.user_id, product_id } });
      if (!existingReview) {
        return res.status(404).json({ error: 'user review for this product not found' });
      }
    
      const newReview = await db.reviews.update({ rating, comment },{ where: {user_id: req.session.user_id, product_id }});
      return res.status(200).json(newReview);
    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  export const deleteReview = async (req, res: Response):Promise<session| err<string>> => {
    try {
      const { error, value } = createUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const { rating,comment } = value;
      const product_id = req.params.product_id;

      const existingProduct= await db.products.findOne({ where: { product_id, } });
      if (!existingProduct) {
        return res.status(404).json({ error: 'product not found' });
      }
      const existingReview= await db.reviews.findOne({ where: {user_id: req.session.user_id, product_id } });
      if (!existingReview) {
        return res.status(404).json({ error: 'user review for this product not found' });
      }
    
      const newReview = await db.reviews.destroy({ where: {user_id: req.session.user_id, product_id }});
      return res.status(200).json(newReview);
    } 
      catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  
  export const getAllUserReviews = async (req, res: Response):Promise<boolean| err<string>> => {
    try {
      const reviews = await db.reviews.findAll({ where: { user_id: req.session.user_id  } });
      return res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };