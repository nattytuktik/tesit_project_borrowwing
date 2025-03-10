import { FastifyPluginAsync } from "fastify";
import {
  createReservateHandler,
  getReservateByBwIdHandler,
} from "./reservate.controllers";

const reservate: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get("/:bw_id", getReservateByBwIdHandler);
  fastify.post("/", createReservateHandler);
};

export default reservate;
