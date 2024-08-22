import { Router } from "express";
import { VideosRepository } from "../modules/videos/repositories/VideosRepository";

const videosRoutes = Router();
const videosRepository = new VideosRepository();

videosRoutes.post("/create-video", (Request, Response) => {
  videosRepository.create(Request, Response);
});

export { videosRoutes };
