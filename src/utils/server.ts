import express from "express";
import deserializeUser from "../middleware/deserializeUser";
import routes from "../routes";
import 'dotenv/config'

const createServer = () => {
  const app = express();

  app.use(express.json({ limit: "50mb" }));
  app.use(deserializeUser);

  routes(app);
  return app;
};

export default createServer;
