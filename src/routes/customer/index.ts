import { FastifyPluginAsync } from "fastify";
import {
  getCustomers,
  registerCustomerHandler,
  deleteCustomerByIdHandler,
  updateCustomerByIdHandler,
  findCustomerByIdHandler,
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

    getCustomers
  );

  /**
   *
   * find Customer By Id Controller
   */
  fastify.get("/:id", {}, findCustomerByIdHandler);

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
    "/update/:id",
    { preHandler: [fastify.authenticate] },
    updateCustomerByIdHandler
  );
};

export default customer;
