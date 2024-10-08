import prisma from "../../utils/prisma";
import { CreateCustomerInput } from "./customer.schema";

/** Cretae Customer
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

/** Find Customers
 *
 *
 */
export async function findManyCustomer() {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
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

/** Find Customer By Id
 *
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

/** Delete Customer By Id
 *
 *
 */
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

/** Update Customer By Id
 *
 *
 */
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
