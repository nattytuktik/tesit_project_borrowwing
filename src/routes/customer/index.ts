import { FastifyPluginAsync } from "fastify";
import {
  getCustomers,
  registerCustomerHandler,
  deleteCustomerByIdHandler,
} from "./customer.controller";

const customer: FastifyPluginAsync = async (fastify, opts) => {
  /**
   *
   *
   *
   *
   *
   *
   *
   *
   * Register Customer Controller
   */

  fastify.post("/", registerCustomerHandler);

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   * Find Customer Controller
   */
  fastify.get(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    getCustomers
  );

  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   * Delete Customer Controller
   */
  fastify.delete("/", deleteCustomerByIdHandler);
};

export default customer;
