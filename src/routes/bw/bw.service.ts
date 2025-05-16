import prisma from "../../utils/prisma";
import { ServicesError } from "../../utils/error.type";
import { CreateBwInputType, TReservate } from "./bw.schema";

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
    const Borrowwing = await prisma.borrowing.findMany({
      where: {
        status: {
          not: "DELETED",
        },
      },
    });
    return Borrowwing;
  } catch (e) {
    throw new ServicesError("Failed to find Borrowwing");
  }
};

export const FindBwById = async (id: number) => {
  try {
    const Borrowwing = await prisma.borrowing.findUnique({
      where: {
        id: id,
        status: {
          not: "DELETED",
        },
      },
      select: {
        id: true,
        customer: true,
        manager_id: true,
        start_date: true,
        end_date: true,
        address: true,
        status: true,
        pandding: true,
        timeStamps: true,
      },
    });

    if (Borrowwing) {
      return Borrowwing;
    } else {
      return {};
    }
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
        address: data.address,
      },
    });
    return Borrowwing;
  } catch (e) {
    throw new ServicesError("Failed to create Borrowwing");
  }
};
export const FindBorrowwingServive = async () => {
  try {
    const findBw = await prisma.borrowing.findMany({
      where: {
        status: "ALREALY",
      },
      select: {
        id: true,
        start_date: true,
        end_date: true,
        address: true,
        status: true,
        customer: true,
        pandding: true,
        timeStamps: true,
      },
    });

    if (findBw) {
      return findBw;
    }

    return null;
  } catch (error) {
    throw new ServicesError("Failed to find Borrowwing");
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

export const UpdateBwPandding = async (id: number) => {
  try {
    const Borrowwing = await prisma.borrowing.update({
      where: {
        id: id,
      },
      data: {
        pandding: "SUCCESS",
      },
    });
    return Borrowwing;
  } catch (error) {
    throw new ServicesError("Failed to update Borrowwing");
  }
};

export const UpdateReservate = async (reservates: Array<TReservate>) => {
  try {
    const result = await prisma.$transaction(
      reservates.map((item) =>
        prisma.equipment.update({
          where: {
            id: item.equipment.id,
          },
          data: {
            used: item.equipment.used - item.quantity,
          },
        })
      )
    );

    console.log(result);
    if (!result) {
      throw new ServicesError("Failed to update equipment");
    }

    return result;
  } catch (error) {
    throw new ServicesError("Failed to update Borrowwing");
  }
};
