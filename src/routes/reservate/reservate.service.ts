import prisma from "../../utils/prisma";
// import equipment from "../eqt/index";

export const FindReservateByBwId = async (bwId: number) => {
  try {
    const Reservate = await prisma.reservation.findMany({
      where: {
        borrowing_id: bwId,
        status: "ALREALY",
      },
      select: {
        borrowing_id: true,
        equipment: true,
        quantity: true,
        timeStamps: true,
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

    const Reservate = await prisma.reservation.createMany({
      data: reservateData,
    });

    //
    const updatePandding = await prisma.borrowing.update({
      where: {
        id: bwid,
      },
      data: {
        pandding: "PROCESSING",
      },
    });

    if (updatePandding && reservateData) {
      await Promise.all(
        reservateData.map((item) =>
          prisma.equipment.update({
            where: { id: item.equipment_id },
            data: { used: { increment: item.quantity } }, // Adjust per item
          })
        )
      );

      return Reservate;
    }

    // edit uses count

    return null;
  } catch (error) {
    // console.log(error);
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

// Update many reservate
export const UpdateManyReservateByBorrowwingId = async (
  bw_id: number,
  equipmentes: Array<{
    id: number;
    quantity: number;
  }>
) => {
  const eqtIdArr = equipmentes.map((item) => item.id);

  const findExEquipment = await prisma.reservation.findMany({
    where: {
      equipment_id: {
        in: eqtIdArr,
      },
    },
  });

  await Promise.all(
    equipmentes.map((item) => {
      findExEquipment.map((exEqt) => {
        // if id of DataRequest === exEquipment update
        if (item.id == exEqt.equipment_id) {
          // DataRequest.quantity more than old record
          if (item.quantity >= exEqt.quantity) {
            const updateCount = item.quantity - exEqt.quantity;

            prisma.equipment.update({
              where: {
                id: item.id,
              },
              data: {
                used: {
                  increment: updateCount,
                },
              },
            });
          } else if (item.quantity < exEqt.quantity) {
            const updateCount = exEqt.quantity - item.quantity;

            prisma.equipment.update({
              where: {
                id: item.id,
              },
              data: {
                used: {
                  decrement: updateCount,
                },
              },
            });
          }

          // update quantity
          prisma.reservation.update({
            where: {
              borrowing_id_equipment_id: {
                borrowing_id: bw_id,
                equipment_id: item.id,
              },
            },
            data: {
              quantity: item.quantity,
            },
          });
        } else {
          prisma.reservation.create({
            data: {
              borrowing_id: bw_id,
              equipment_id: item.id,
              quantity: item.quantity,
            },
          });

          prisma.equipment.update({
            where: {
              id: item.id,
            },
            data: {
              used: item.quantity,
            },
          });
        }
      });
    })
  )
    .then(() => {
      return {
        status: true,
      };
    })
    .catch(() => {
      return { status: false };
    });

  try {
  } catch (error) {
    throw new Error("Failed to update many reservate at reservate.service.ts");
  }
};

// const UpdateUsedCountEquipment = async (
//   array: Array<{ equipment_id: number; quantity: number }>
// ) => {
//   await Promise.all(
//     array.map((item) =>
//       prisma.equipment.update({
//         where: { id: item.equipment_id },
//         data: { used: { increment: item.quantity } }, // Adjust per item
//       })
//     )
//   );
// };
