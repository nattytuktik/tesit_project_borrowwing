import { FastifyPluginAsync } from "fastify";
import {
  createEquimentHandler,
  createManyEquimentHandler,
  findManyEquimentHandler,
} from "./eqt.controller";

const equiment: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    createEquimentHandler
  );

  fastify.post(
    "/many",
    {
      preHandler: [fastify.authenticate],
    },
    createManyEquimentHandler
  );

  fastify.get("/", findManyEquimentHandler);
};

export default equiment;
