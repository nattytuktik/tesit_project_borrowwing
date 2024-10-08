import prisma from "../../utils/prisma";
import { CreateCustomerInput } from "./customer.schema";

/**
 *
 *
 */
export async function createCustomer(data: CreateCustomerInput) {
  try {
    const customers = await prisma.customer.create({
      data: data,
    });
    return customers;
  } catch (e) {
    return {
      status: 500,
      msg: e,
    };
  }
}

export async function findCustomers() {
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
export async function findCustomerById(id: number) {
  try {
    const customers = await prisma.customer.findUnique({
      where: { id: id },
    });
    return customers;
  } catch (e) {
    return {
      status: 500,
      msg: e,
    };
  }
}

export async function deleteCustomerById(id: number) {
  try {
    const customers = await prisma.customer.update({
      where: { id: id },
      data: {
        status: "DELETED",
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

export async function updateCustomerById(
  id: number,
  data: CreateCustomerInput
) {
  try {
    const customers = await prisma.customer.update({
      where: { id: id },
      data: data,
    });
    return customers;
  } catch (e) {
    return {
      status: 500,
      msg: e,
    };
  }
}
