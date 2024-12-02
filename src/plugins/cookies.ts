import fCookie, { FastifyCookieOptions } from "@fastify/cookie";
import fp from "fastify-plugin";

export default fp<FastifyCookieOptions>(async function (fastify) {
  fastify.register(fCookie, {
    secret: "EFRGIT^&*%HJVJKRED",
    hook: "preHandler",
  });
});
