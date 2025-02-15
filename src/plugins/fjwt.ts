import fjwt, { FastifyJWTOptions, JWT } from "@fastify/jwt";
import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import fCookie from "@fastify/cookie";

export default fp<FastifyJWTOptions>(async function (fastify) {
  fastify.register(fjwt, {
    secret: "kejnvojdoidvpnebouiubo[pojn",
  });

  fastify.addHook("preHandler", (request, reply, next) => {
    request.jwt = fastify.jwt;
    return next();
  });

  fastify.register(fCookie, {
    secret: "EFRGIT^&*%HJVJKRED",
    hook: "preHandler",
  });

  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
          return reply.status(401).send({
            message: "Authentication required",
            success: false,
          });
        }

        // Verify the JWT token and set the decoded payload to req.user
        const decoded = await req.jwt.verify(token);
        req.user = decoded;
      } catch (error) {
        reply.status(401).send({
          message: "Invalid or expired token",
          success: false,
        });
      }
    }
  );
});

// Extend Fastify types to include user and jwt in the request object
declare module "fastify" {
  export interface FastifyRequest {
    jwt: JWT;
  }

  export interface FastifyInstance {
    authenticate: any;
  }
}
