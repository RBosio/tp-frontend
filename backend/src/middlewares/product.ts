import { NextFunction, Request, Response } from "express";
import { conn } from "../config/typeorm";
import { Product } from "../entities/product";

export const productExists = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const rows = await conn.getRepository(Product).findOneBy({id: parseInt(id)})
  
  if (!rows) {
      return res.send('Product doesn\'t exists')
  }

  next()
}