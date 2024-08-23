import { Router } from "express";
import { VideosRepository } from "../modules/videos/repositories/VideosRepository";

const videosRoutes = Router();
const videosRepository = new VideosRepository();

videosRoutes.post("/create-video", (Request, Response) => {
  videosRepository.create(Request, Response);
});

videosRoutes.get("/get-videos", (Request, Response) => {
  videosRepository.getVideos(Request, Response);
});

export { videosRoutes };
