import { FastifyPluginAsync } from "fastify";
import {
  getCustomers,
  registerCustomerHandler,
  deleteCustomerByIdHandler,
  updateCustomerByIdHandler,
} from "./customer.controller";

const customer: FastifyPluginAsync = async (fastify, opts) => {
  /**
   * Register Customer Controller
   */
  fastify.post(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    registerCustomerHandler
  );

  /**
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
   * Delete Customer Controller
   */
  fastify.delete(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    deleteCustomerByIdHandler
  );

  // Update Customer Controller
  fastify.put(
    "/update",
    { preHandler: [fastify.authenticate] },
    updateCustomerByIdHandler
  );
};

export default customer;
