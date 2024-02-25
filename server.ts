import express, { Express } from "express";
import cors from "cors";

import routes from "./routes";

const app: Express = express();

app.use(cors({ origin: true, credentials: true }));
app.use("/pictures", express.static("pictures"));
app.use("/video", express.static("video"));
app.use("/chats", express.static("chats"));
app.use("/phoneCall", express.static("phoneCall"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

app.listen(8081, () => {
  console.log("Server Opened");
});
