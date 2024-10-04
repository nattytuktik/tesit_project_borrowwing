import { FastifyPluginAsync } from "fastify";
import { getCustomer, registerCustomerHandler } from "./customer.controller";

const customer: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post("/", registerCustomerHandler);
  fastify.get("/", getCustomer);
};

export default customer;
