import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateReservate,
  FindReservateByBorrowwingId,
  FindReservateByBwId,
} from "./reservate.service";

/**
 *
 *
 *
 *
 *
 *
 * Get Reservate Handler
 */
export const getReservateByBwIdHandler = async (
  request: FastifyRequest<{
    Params: { bw_id: string };
  }>,
  reply: FastifyReply
) => {
  try {
    // get the bw_id from the request params
    const bw_id = parseInt(request.params.bw_id);

    // find many Reservates
    if (!bw_id) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to find one Reservates",
      });
    }

    // code here
    const Reservates = await FindReservateByBwId(bw_id);

    if (!Reservates) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to find one Reservates",
      });
    }

    return reply.code(200).send({
      data: Reservates,
      msg: "Successfull to find one Reservates",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return reply.code(500).send({
      success: false,
      msg: error,
    });
  }
};

/**
 *
 *
 *
 *
 *
 *
 * Create Reservate Handler
 */
export const createReservateHandler = async (
  request: FastifyRequest<{
    Body: {
      bw_id: string;
      eqts: Array<{ equipment_id: number; quantity: number }>;
    };
  }>,
  reply: FastifyReply
) => {
  // code here

  try {
    const { bw_id, eqts } = request.body;

    const equiments = eqts.map((item) => {
      return {
        id: item.equipment_id,
        quantity: item.quantity,
      };
    });

    // const bw_id_int = parseInt(bw_id);

    if (bw_id == null) {
      return reply.code(400).send({
        success: false,
        msg: "Failed to find Borrowwing bw_id",
      });
    }

    const findReservateByBwId = await FindReservateByBorrowwingId(
      parseInt(bw_id)
    );

    if (findReservateByBwId !== null) {
      return reply.code(400).send({
        success: false,
        msg: "Failed to create Reservate",
      });
    }
    const Reservate = await CreateReservate(parseInt(bw_id), equiments);
    console.log(Reservate);
    if (Reservate) {
      return reply.code(200).send({
        success: true,
        msg: "Successfull to create Reservate",
      });
    } else {
      return reply.code(400).send({
        success: false,
        msg: "Failed to create Reservate on create",
      });
    }
  } catch (error) {
    console.log(error);
    return reply.code(500).send({
      success: false,
      msg: "error",
    });
  }
};
