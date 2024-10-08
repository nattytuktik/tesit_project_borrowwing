import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { CreateCustomerInput } from "./customer.schema";
import {
  createCustomer,
  deleteCustomerById,
  findManyCustomer,
} from "./customer.service";

//
//
//
//

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 
 * Register Customer Handler
 */
export async function registerCustomerHandler(
  request: FastifyRequest<{ Body: CreateCustomerInput }>,
  reply: FastifyReply
) {
  try {
    const customerFromRequest = request.body;
    const customer = await createCustomer(customerFromRequest);

    return customer;
  } catch (error) {
    reply.code(500).send({
      error,
    });
  }
}

/**
 *
 *
 *
 * Find Customer Handler
 *
 *
 *
 */
export async function getCustomers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const customers = await findManyCustomer();
    // Check if the response is an object error
    if (typeof customers === "object") {
      return reply.code(500).send(customers);
    }

    return customers;
  } catch (e) {
    return {
      status: 500,
      msg: e,
    };
  }
}

/**
 *
 */
export async function deleteCustomerByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  try {
    const customers = await deleteCustomerById(parseInt(id));
    return customers;
  } catch (e) {
    return {
      status: 500,
      details: e,
    };
  }
}
