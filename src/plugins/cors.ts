import cors from "@fastify/cors";
import fp from "fastify-plugin";

export default fp(async function (fastify) {
  fastify.register(cors, {
    origin: ["http://localhost:4000"], // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true, // Allow credentials (cookies, authorization headers)
  });
});
