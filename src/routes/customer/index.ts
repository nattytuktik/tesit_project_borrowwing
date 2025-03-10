import { FastifyPluginAsync } from "fastify";
import {
  getCustomers,
  registerCustomerHandler,
  deleteCustomerByIdHandler,
  updateCustomerByIdHandler,
  findCustomerByIdHandler,
  findCustomerByBwIdHandler,
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

  fastify.get("/bw/:bw_id", findCustomerByBwIdHandler);
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
