import { Router } from "express";

import {
  getCategoryList,
  getPicturesList,
  getVideoList,
  getMainList,
} from "../controllers/category/controller";

const router = Router();

router.get("/", getCategoryList);

router.get("/pictures", getPicturesList);

router.get("/video", getVideoList);

router.get("/main", getMainList);

export default router;
