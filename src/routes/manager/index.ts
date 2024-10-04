import { FastifyPluginAsync } from "fastify";
import { $ref } from "../../utils/schema";
import {
  createManagerHandler,
  findsManagerHandler,
  loginHandler,
} from "./mng.controller";

const manager: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post(
    "/",
    {
      schema: {
        body: $ref("createManagerSchema"),
      },
    },
    createManagerHandler
  );

  fastify.post("/login", loginHandler);

  fastify.get("/", findsManagerHandler);
};

export default manager;
