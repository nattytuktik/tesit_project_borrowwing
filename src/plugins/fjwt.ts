import fjwt, { FastifyJWTOptions, JWT } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp<FastifyJWTOptions>(async function (fastfy) {
  fastfy.register(fjwt, {
    secret: "kejnvojdoidvpnebouiubo[pojn",
  });

  fastfy.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );
});

declare module "fastify" {
  export interface FastifyRequest {
    jwt: JWT;
  }
}
