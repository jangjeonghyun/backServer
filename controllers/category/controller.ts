import { Request, Response } from "express";
import fs from "fs";

const PICTURES_PATH = "./pictures";
const VIDEO_PATH = "./video";
const CHATS_PATH = "./chats";
const PHONE_CALL_PATH = "./phoneCall";
const DISPLAY_IMAGE = 9;
const DISPLAY_CALL = 18;

const readPhoneCallDir = fs.readdirSync(PHONE_CALL_PATH);
const readPictureDir = fs.readdirSync(PICTURES_PATH);
const readVideoDir = fs.readdirSync(VIDEO_PATH);
const readChatDir = fs.readdirSync(CHATS_PATH);

const getCategoryList = async (req: Request, res: Response) => {
  try {
    const { mainCategory } = req.query;

    const mainCategoryList = fs.readdirSync(`./${mainCategory}`);
    res.json(mainCategoryList);
  } catch (error) {
    console.log(error);
    res.json({ msg: "server MainCate List Error" });
  }
};

const getPicturesList = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    let list: string[] = [];

    if (filter) {
      readPictureDir.map((dirName) => {
        if (filter == dirName) {
          const dirList = fs.readdirSync(`${PICTURES_PATH}/${dirName}`);
          list = dirList.map((fileName) => {
            return `${PICTURES_PATH.replace(".", "")}/${dirName}/${fileName}`;
          });
        }
      });
    } else {
      readPictureDir.map((dirName) => {
        fs.readdirSync(`${PICTURES_PATH}/${dirName}`).map((fileName) => {
          list.push(`${PICTURES_PATH.replace(".", "")}/${dirName}/${fileName}`);
        });
      });
    }

    res.json(list);
  } catch (error) {
    console.log(error);
    res.json({ msg: "server error", error });
  }
};

const getVideoList = async (req: Request, res: Response) => {
  try {
    let list: string[] = [];

    readVideoDir.map((fileName) => {
      list.push(`${VIDEO_PATH.replace(".", "")}/${fileName}`);
    });

    res.json(list);
  } catch (error) {
    console.log(error);
    res.json({ msg: "server error", error });
  }
};

const getChatList = async (req: Request, res: Response) => {
  try {
    let list: string[] = [];

    readChatDir.map((fileName) => {
      list.push(fs.readFileSync(`${CHATS_PATH}/${fileName}`).toString());
    });

    res.json(list);
  } catch (error) {
    console.log(error);
    res.json({ msg: "server error", error });
  }
};

const getPhoneCallList = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    let offset: number = (Number(page) - 1) * DISPLAY_IMAGE;
    let list: string[] = [];
    let totalPage: number;

    readPhoneCallDir.map((fileName) => {
      list.push(`${PHONE_CALL_PATH.replace(".", "")}/${fileName}`);
    });
    totalPage = Math.ceil(list.length / DISPLAY_CALL);
    list = list.slice(offset, offset + DISPLAY_CALL);

    res.json({ list, totalPage });
  } catch (error) {
    console.log(error);
    res.json({ msg: "server error", error });
  }
};

const getMainList = async (req: Request, res: Response) => {
  try {
    let list: string[] = [];

    readPictureDir.map((dirName) => {
      fs.readdirSync(`${PICTURES_PATH}/${dirName}`).map((fileName) => {
        list.push(`${PICTURES_PATH.replace(".", "")}/${dirName}/${fileName}`);
      });
    });
    let random = Math.floor(Math.random() * list.length);
    if (list.length < random + 10)
      list = list.slice(list.length - DISPLAY_IMAGE, list.length);
    else list = list.slice(random, random + DISPLAY_IMAGE);

    res.json(list);
  } catch (error) {
    console.log(error);
    res.json({ msg: "server error", error });
  }
};
export {
  getCategoryList,
  getPicturesList,
  getVideoList,
  getChatList,
  getPhoneCallList,
  getMainList,
};
