import { FastifyPluginAsync } from "fastify";
import {
  createReservateHandler,
  getReservateByBwIdHandler,
  updateReservateByBwIdHandler,
} from "./reservate.controllers";

const reservate: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get("/bw/:bw_id", getReservateByBwIdHandler);
  fastify.post("/", createReservateHandler);
  fastify.put("/", updateReservateByBwIdHandler);
};

export default reservate;
