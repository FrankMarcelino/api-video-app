import { Router } from "express";
import { VideosRepository } from "../modules/videos/repositories/VideosRepository";
import { login } from "../middleware/login";

const videosRoutes = Router();
const videosRepository = new VideosRepository();

videosRoutes.post("/create-video", login, (Request, Response) => {
  videosRepository.create(Request, Response);
});

videosRoutes.get("/get-videos/:user_id", login, (Request, Response) => {
  videosRepository.getVideos(Request, Response);
});

videosRoutes.get("/search-videos", login, (Request, Response) => {
  videosRepository.searchVideos(Request, Response);
});

export { videosRoutes };
