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

  getVideos(request: Request, res: Response) {
    const { user_id } = request.query;
    pool.getConnection((err: any, connection: any) => {
      connection.query(
        `SELECT * FROM videos WHERE user_id = ?`,
        [user_id],
        (error: any, results: any, fields: any) => {
          connection.release();
          if (error) {
            return res.status(400).json({ error: "Error ao buscar videos" });
          }
          return res
            .status(200)
            .json({ message: "Videos encontrados", videos: results });
        }
      );
    });
  }

  searchVideos(request: Request, res: Response) {
    const { search } = request.query;
    pool.getConnection((err: any, connection: any) => {
      connection.query(
        `SELECT * FROM videos WHERE title LIKE ?`,
        [`%${search}%`],
        (error: any, results: any, fields: any) => {
          connection.release();
          if (error) {
            return res.status(400).json({ error: "Error ao buscar videos" });
          }
          return res
            .status(200)
            .json({ message: "Videos encontrados", videos: results });
        }
      );
    });
  }
}

export { VideosRepository };
