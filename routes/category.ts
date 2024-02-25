import { Router } from "express";

import {
  getCategoryList,
  getPicturesList,
  getVideoList,
  getChatList,
  getPhoneCallList,
  getMainList,
} from "../controllers/category/controller";

const router = Router();

router.get("/", getCategoryList);

router.get("/pictures", getPicturesList);

router.get("/video", getVideoList);

router.get("/chat", getChatList);

router.get("/phoneCall", getPhoneCallList);

router.get("/main", getMainList);

export default router;
