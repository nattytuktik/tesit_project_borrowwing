import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { CreateCustomerInput } from "./customer.schema";

//
//
//
//

async function registerCustomerHandler(
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

//
async function getCustomer(request: FastifyRequest, reply: FastifyReply) {
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
export { registerCustomerHandler, getCustomer };
