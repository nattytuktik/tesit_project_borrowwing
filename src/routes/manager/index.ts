import { FastifyPluginAsync } from "fastify";
import { $ref } from "../../utils/schema";
import {
  registorManagerHandler,
  deleteManagerHandler,
  findsManagerHandler,
  loginHandler,
  logoutHandler,
} from "./mng.controller";

/**
 * Routes paths of Manager
 */
const manager: FastifyPluginAsync = async (fastify, opts) => {
  /**
   * create new admin
   */
  fastify.post(
    "/registor",
    {
      schema: {
        body: $ref("createManagerSchema"),
      },
    },
    registorManagerHandler
  );

  /**
   * login
   */
  fastify.post("/login", loginHandler);

  /**
   * find admin
   */
  fastify.get(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    findsManagerHandler
  );

  /**
   * Logout
   */
  fastify.delete(
    "/logout",
    { preHandler: [fastify.authenticate] },
    logoutHandler
  );

  /**
   * delete
   */
  fastify.delete(
    "/",
    { preHandler: [fastify.authenticate] },
    deleteManagerHandler
  );
};

export default manager;
