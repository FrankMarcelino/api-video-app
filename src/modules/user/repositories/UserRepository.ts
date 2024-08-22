import { pool } from "../../../mysql";
import { v4 as uuidv4 } from "uuid";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

class UserRespository {
  create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    pool.getConnection((err: any, connection: any) => {
      hash(password, 10, (err: any, hash: any) => {
        if (err) {
          return res.status(500).json(err);
        }

        connection.query(
          `INSERT INTO users (user_id, name, email, password) VALUES (?, ?, ?, ?)`,
          [uuidv4(), name, email, hash],
          (error: any, results: any, fields: any) => {
            connection.release();
            if (error) {
              return res.status(400).json(error);
            }
            res.status(200).json({ message: "Usário criado com sucesso" });
          }
        );
      });
    });
  }

  login(req: Request, res: Response) {
    const { email, password } = req.body;
    pool.getConnection((err: any, connection: any) => {
      connection.query(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (error: any, results: any, fields: any) => {
          connection.release();
          if (error) {
            return res.status(400).json({ error: "Error na sua autenticação" });
          }

          compare(password, results[0].password, (err: any, result: any) => {
            if (err) {
              return res
                .status(400)
                .json({ error: "Error na sua autenticação" });
            }

            if (result) {
              //jsonwebtoken
              const token = sign(
                {
                  id: results[0].user_id,
                  email: results[0].email,
                },
                "secret",
                {
                  expiresIn: "1d",
                }
              );
              return res
                .status(200)
                .json({ token: token, message: "Login efetuado com sucesso" });
            }
          });
        }
      );
    });
  }
}

export { UserRespository };
