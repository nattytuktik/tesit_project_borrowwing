import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { CreateCustomerInput } from "./customer.schema";
import { deleteCustomerById } from "./customer.service";

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
  const customerFromRequest = request.body;
  const createCustomer = await prisma.customer.create({
    data: customerFromRequest,
  });

  try {
    return createCustomer.id;
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
    const customers = await prisma.customer.findMany({
      select: {
        first_name: true,
        last_name: true,
        tel: true,
      },
    });
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
