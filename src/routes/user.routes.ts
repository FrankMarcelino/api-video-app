import { Router } from "express";
import { UserRespository } from "../modules/user/repositories/UserRepository";

const userRoutes = Router();
const userRespository = new UserRespository();

userRoutes.post("/sign-up", (Request, Response) => {
  userRespository.create(Request, Response);
});

userRoutes.post("/sign-in", (Request, Response) => {
  userRespository.login(Request, Response);
});

export { userRoutes };
