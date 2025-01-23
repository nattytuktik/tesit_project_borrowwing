import prisma from "../../utils/prisma";
import { ServicesError } from "../../utils/error.type";
import { CreateBwInputType } from "./bw.schema";

//  find Borrowwing by customer id
export const findBorrowwingByCustomerId = async (customerId: number) => {
  try {
    const Borrowwing = await prisma.borrowing.findMany({
      where: {
        customer_id: customerId,
      },
    });
    return Borrowwing;
  } catch (e) {
    throw new ServicesError("Failed to find Borrowwing");
  }
};

export const findManyBwService = async () => {
  try {
    const Borrowwing = await prisma.borrowing.findMany();
    return Borrowwing;
  } catch (e) {
    throw new ServicesError("Failed to find Borrowwing");
  }
};

export const findBwbyIdServive = async (id: number) => {
  try {
    const Borrowwing = await prisma.borrowing.findUnique({
      where: {
        id: id,
      },
    });
    return Borrowwing;
  } catch (e) {
    throw new ServicesError("Failed to find Borrowwing");
  }
};

export const createBwService = async (data: CreateBwInputType) => {
  try {
    const Borrowwing = await prisma.borrowing.create({
      data: {
        customer_id: data.customer_id,
        manager_id: data.manager_id,
        start_date: data.start_date,
        end_date: data.end_date,
      },
    });
    return Borrowwing;
  } catch (e) {
    throw new ServicesError("Failed to create Borrowwing");
  }
};

export const deleteBwByIdService = async (id: number) => {
  try {
    // updtate status to DELETED
    const Borrowing = await prisma.borrowing.update({
      where: {
        id: id,
      },
      data: {
        status: "DELETED",
      },
    });
    return Borrowing;
  } catch (error) {
    throw new ServicesError("Failed to delete Borrowwing");
  }
};

export const terminateBwService = async (id: number) => {
  try {
    const Borrowing = await prisma.borrowing.delete({
      where: {
        id: id,
      },
    });
    return Borrowing;
  } catch (error) {
    throw new ServicesError("Failed to terminate Borrowwing");
  }
};

export const updateBwByIdService = async (
  id: number,
  data: CreateBwInputType
) => {
  try {
    const Borrowwing = await prisma.borrowing.update({
      where: {
        id: id,
      },
      data: {
        customer_id: data.customer_id,
        manager_id: data.manager_id,
        start_date: data.start_date,
        end_date: data.end_date,
      },
    });
    return Borrowwing;
  } catch (error) {
    throw new ServicesError("Failed to update Borrowwing");
  }
};
