import { FastifyPluginAsync } from "fastify";
import { createBwHandler, findOneBwHandler } from "./bw.controller";

const bowwing: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/:customer_id", findOneBwHandler);
  fastify.post("/", createBwHandler);
};

export default bowwing;
