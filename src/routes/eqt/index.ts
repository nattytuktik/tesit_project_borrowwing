import { FastifyPluginAsync } from "fastify";
import {
  createEquimentHandler,
  createManyEquimentHandler,
  findManyEquimentHandler,
} from "./eqt.controller";

const equiment: FastifyPluginAsync = async (fastify, opts) => {
  // Create Equiment
  fastify.post(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    createEquimentHandler
  );

  // Create Many Equiment
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
