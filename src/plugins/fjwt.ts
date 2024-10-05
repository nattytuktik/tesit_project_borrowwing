import fjwt, { FastifyJWTOptions, JWT } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp<FastifyJWTOptions>(async function (fastify) {
  fastify.register(fjwt, {
    secret: "kejnvojdoidvpnebouiubo[pojn",
  });

  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const token = req.cookies.access_token;
      if (!token) {
        return reply.status(401).send({ message: "Authentication required" });
      }

      // here decoded will be a different type by default but we want it to be of user-payload type
      const decoded = req.jwt.verify(token);
      req.user = decoded;
    }
  );
});

declare module "fastify" {
  export interface FastifyRequest {
    jwt: JWT;
  }

  export interface FastifyInstance {
    authenticate: any;
  }
}
