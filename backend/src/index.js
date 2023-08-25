import dotenv from "dotenv";
dotenv.config();
import express from "express";
import indexRouter from "./routers/index.router.js";
import manageConection from "./middlewares/manageConection.middleware.js";
import cors from "./middlewares/cors.middleware.js";
import db from "./db.js";

import userSessionMiddleware from "./middlewares/userSession.middleware.js";

db();
const app = express();
app.use(cors);
app.use(express.json());
app.use(manageConection);
app.use(userSessionMiddleware);
app.use("/api", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App activa en el puerto ${PORT}`);
});
