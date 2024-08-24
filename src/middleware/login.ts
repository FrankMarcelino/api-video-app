import { verify } from "jsonwebtoken";

const login = (req: any, res: any, next: any) => {
  try {
    const decoded = verify(
      req.headers.authorization,
      process.env.SECRET as string
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Não autorizado",
    });
  }
};

export { login };
