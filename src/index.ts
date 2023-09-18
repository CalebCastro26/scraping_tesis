import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routerApi } from "./router/index.routes";
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from "./middlewares/error.handler";
import { scrapAll } from "./app/scrapAll";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
const whitelist = ["http://localhost:8080"];
const options: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin || "") || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};

app.use(cors(options));

app.get("/", (req, res) => {
  res.send("El servidor ha iniciado");
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//scrapAll()

app.listen(PORT, () => {
  console.log(`El backend se inicio en el puerto ${PORT}`);
});
