import { pool } from "../../../mysql";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

class VideosRepository {
  create(req: Request, res: Response) {
    const { title, description, user_id } = req.body;
    pool.getConnection((err: any, connection: any) => {
      connection.query(
        `INSERT INTO videos (videos_id, user_id, title, description) VALUES (?, ?, ?, ?)`,
        [uuidv4(), user_id, title, description],
        (error: any, results: any, fields: any) => {
          connection.release();
          if (error) {
            return res.status(400).json(error);
          }
          res.status(200).json({ messege: "Video criado com sucesso" });
        }
      );
    });
  }
}

export { VideosRepository };
