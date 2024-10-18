import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCustomerInput } from "./customer.schema";
import { ServicesError } from "../../utils/error.type";
import {
  createCustomer,
  deleteCustomerById,
  findCustomerById,
  findCustomerByName,
  findManyCustomer,
  updateCustomerById,
} from "./customer.service";

/**
 *
 *
 *
 *
 *
 * Register Customer
 * auth required
 */
export async function registerCustomerHandler(
  request: FastifyRequest<{ Body: CreateCustomerInput }>,
  reply: FastifyReply
) {
  try {
    // resive data from request as object
    const customerFromRequest = request.body;

    // Destructure the first_name and last_name from the request body
    const { first_name, last_name } = request.body;

    // Check if the customer already exists
    const customerValidation = await findCustomerByName({
      first_name,
      last_name,
    });

    // Get the length of the customerValidation array
    const customerValidationLentgh = customerValidation.length;

    // Check if the customer already exists
    if (customerValidationLentgh > 0) {
      return reply.code(400).send({
        msg: "Customer Already Exists",
        error: customerValidation,
      });
    }

    // Create Customer
    const customer = await createCustomer(customerFromRequest);

    // Check if the response is an object error
    if (customer instanceof ServicesError) {
      return reply.code(500).send({
        msg: "Internal Server Error On Creating Customer service",
        error: customer,
      });
    }

    // Return the customer
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
 *
 *
 * Find Customer Handler
 */
export async function getCustomers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const customers = await findManyCustomer();

    // Check if the response is an object error
    if (customers instanceof ServicesError) {
      return reply.code(500).send({
        msg: "Internal Server Error On FindManyCustomer service",
        error: customers,
      });
    }

    return customers;
  } catch (e) {
    //
    return {
      status: 500,
      msg: "Internal Server Error",
      details: e,
    };
  }
}

/**
 *
 *
 *
 *
 *
 * delete Customer By Id Handler
 * auth required
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

/**
 *
 *
 *
 *
 *
 *
 * Update Customer By Id Handler
 */
export async function updateCustomerByIdHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: CreateCustomerInput;
  }>,
  reply: FastifyReply
) {
  try {
    // Get the customer id from the request params
    const { id } = request.params;

    // Get the customer data from the request body
    const customerData = request.body;

    // Check if the customer exists
    const findCustomer = await findCustomerById(parseInt(id));

    if (!findCustomer) {
      return {
        status: 404,
        msg: "Customer not found",
      };
    }

    const { first_name, last_name, tel } = customerData;

    // Check if the customer data is the same as the customer
    if (
      first_name === findCustomer.first_name &&
      last_name === findCustomer.last_name &&
      tel === findCustomer.tel
    ) {
      reply.code(400).send({
        msg: "No changes made",
      });
    }

    // Update the customer
    const customer = await updateCustomerById(parseInt(id), customerData);

    return reply.code(200).send({
      msg: "Customer updated successfully",
      data: customer,
    });
  } catch (e) {
    return {
      status: 500,
      details: e,
    };
  }
}

/**
 *
 *
 *
 *
 *
 * Find Customer By Id Handler
 */
export async function findCustomerByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const customer = await findCustomerById(parseInt(id));

    if (!customer) {
      return {
        status: 404,
        msg: "Customer not found",
      };
    }

    return customer;
  } catch (e) {
    reply.code(500).send({
      error: e,
    });
  }
}
