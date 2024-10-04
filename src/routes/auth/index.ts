import { FastifyPluginAsync } from "fastify";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", () => {
    return {
      status: true,
    };
  });
};

export default auth;
