import prisma from "../../utils/prisma";
import { CreateCustomerInput } from "./customer.schema";
import { ServicesError } from "../../utils/error.type"; // Adjust the import path as necessary

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
    return e;
  }
}

/** Find Customers
 *
 *
 *
 */

export async function findManyCustomer() {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        status: "ALREALY",
      },
    });
    return customers;
  } catch (e) {
    throw new ServicesError("Failed to fetch customers");
  }
}

/** Find Customer By Id
 *
 *
 */
export async function findCustomerById(id: number) {
  try {
    const customers = await prisma.customer.findUnique({
      where: { id: id, status: "ALREALY" },
    });
    return customers;
  } catch (e) {
    throw new ServicesError("Failed to fetch customers");
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
    throw new ServicesError("Failed to delete customers");
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
    throw new ServicesError("Failed to update customers");
  }
}
/** Find Customer By First Name and Last Name
 *
 *
 */
export async function findCustomerByName({
  first_name = "",
  last_name = "",
}: {
  first_name: string;
  last_name: string;
}) {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        first_name: {
          contains: first_name,
        },
        last_name: {
          contains: last_name,
        },
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        tel: true,
      },
    });
    return customers;
  } catch (e) {
    console.log(e);
    throw new ServicesError("Failed to fetch customers by name");
  }
}
