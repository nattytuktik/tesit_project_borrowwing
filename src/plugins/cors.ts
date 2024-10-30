import cors from "@fastify/cors";
import fp from "fastify-plugin";

export default fp(async function (fastify) {
  fastify.addHook("preHandler", (request, reply, next) => {
    request.jwt = fastify.jwt;
    return next();
  });

  fastify.register(cors, {
    origin: "*", // Adjust this according to your security requirements
    methods: ["GET", "PUT", "POST", "DELETE"],
  });
});
