import fCookie, { FastifyCookieOptions } from "@fastify/cookie";
import fp from "fastify-plugin";

export default fp<FastifyCookieOptions>(async function (fastify) {
  fastify.addHook("preHandler", (request, reply, next) => {
    request.jwt = fastify.jwt;
    return next();
  });

  fastify.register(fCookie, {
    secret: "EFRGIT^&*%HJVJKRED",
    hook: "preHandler",
  });
});
