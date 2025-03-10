import prisma from "../../utils/prisma";

export const FindReservateByBwId = async (bwId: number) => {
  try {
    const Reservate = await prisma.reservation.findMany({
      where: {
        borrowing_id: bwId,
      },
    });

    return Reservate;
  } catch (error) {
    throw new Error("Failed to find reservate at reservate.service.ts");
  }
};

export const CreateReservate = async (
  bwid: number,
  data: Array<{ id: number; quantity: number }>
) => {
  try {
    const reservateData = data.map((item) => {
      return {
        borrowing_id: bwid,
        equipment_id: item.id,
        quantity: item.quantity,
      };
    });

    console.log(reservateData);
    const Reservate = await prisma.reservation.createMany({
      data: reservateData,
    });

    console.log(Reservate);
    return Reservate;
  } catch (error) {
    throw new Error("Failed to create reservate at reservate.service.ts");
  }
};

export const FindReservateByBorrowwingId = async (borrowingId: number) => {
  try {
    const Reservate = await prisma.reservation.findFirst({
      where: {
        borrowing_id: borrowingId,
      },
    });
    return Reservate;
  } catch (error) {
    throw new Error("Failed to find reservate at reservate.service.ts");
  }
};
