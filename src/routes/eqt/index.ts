import { FastifyPluginAsync } from "fastify";
import { createEquimentHandler } from "./eqt.controller";

const equiment: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post("/", createEquimentHandler);
};

export default equiment;
