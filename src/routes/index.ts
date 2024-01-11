import express, { Router } from "express";
import { logParserRoute } from "../modules/logParser";

const router = express.Router();

export interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [...logParserRoute];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
