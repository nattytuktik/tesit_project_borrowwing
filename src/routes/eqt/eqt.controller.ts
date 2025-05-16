import { FastifyRequest, FastifyReply } from "fastify";
import { CreateEquipmentInputType } from "./eqt.schema";
import {
  CreateEquipment,
  CreateManyEquipments,
  FindEquipmentById,
  FindEquipmentByName,
  FindManyEquipments,
  UpdateImageNameById,
  UpdateEquipmentById,
  DeleteEquipmentById,
} from "./eqt.service";

/**
 *
 * Create Equipment
 */
export const createEquipmentHandler = async (
  request: FastifyRequest<{
    Body: CreateEquipmentInputType;
  }>,
  reply: FastifyReply
) => {
  try {
    // verify requestBody
    const equipmentBodyRequest = request.body;

    // find equipment
    const findEquipment = await FindEquipmentByName(equipmentBodyRequest.name);

    if (findEquipment) {
      return reply.code(400).send({
        status: 0,
        msg: "Equipment Already Exists",
      });
    }
    // insert into database
    const createEquipment = await CreateEquipment(equipmentBodyRequest);

    // response
    return reply.code(200).send({
      result: createEquipment,
      msg: "Insert Equipment Successful",
    });
  } catch (e) {
    reply.code(500).send({
      status: 0,
      msg: e,
    });
  }
};

/**
 *
 *
 * Create Many Equipment
 */
export const createManyEquipmentHandler = async (
  request: FastifyRequest<{
    Body: CreateEquipmentInputType[];
  }>,
  reply: FastifyReply
) => {
  try {
    // verify requestBody
    const equipmentBodyRequest = request.body;

    const equipments = await CreateManyEquipments(equipmentBodyRequest);

    if (!equipments) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to create many equipments",
      });
    }
    return reply.code(200).send({
      result: equipments,
      msg: "Successful to create many equipments",
    });
  } catch (e) {
    // debug
    return reply.code(500).send({
      success: false,
      messages: e,
    });
  }
};

/**
 *
 *
 *
 * find many equipment
 */
export const findManyEquipmentHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    // find all equipments
    const equipments = await FindManyEquipments();

    if (!equipments) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to find many equipments",
      });
    }
    return reply.code(200).send({
      data: equipments,
      msg: "Successful to find many equipments",
      success: true,
    });
  } catch (e) {
    // debug
    return reply.code(500).send({
      success: false,
      msg: e,
    });
  }
};

/**
 *
 *
 *
 *
 */
export const findEquipmentByIdHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  // code here

  try {
    const params = req.params as { id: string };
    const id = params.id;
    const equipment = await FindEquipmentById(Number(id));

    if (!equipment) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to find equipment",
      });
    }

    return reply.code(200).send({
      data: equipment,
      msg: "Successful to find equipment",
      success: true,
    });
  } catch (error) {
    // code here
    return reply.code(500).send({
      success: false,
      msg: error,
    });
  }
};

export const uploadImageHandler = async (
  requset: FastifyRequest<{
    Body: {
      id: string;
      image: string;
    };
  }>,
  reply: FastifyReply
) => {
  // code here

  try {
    const { image } = requset.body;
    const str_id = requset.body.id;
    const id = parseInt(str_id);
    if (isNaN(id)) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Invalid id",
      });
    }

    if (!image) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Image is required",
      });
    }

    // Save the image to the server or perform any other operation

    const saveImage = await UpdateImageNameById(id, image);

    if (!saveImage) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to save image",
      });
    }

    return reply.code(200).send({
      data: image,
      msg: "Successful to upload image",
      success: true,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      msg: error,
    });
  }
};

export const updateEquipmentHandler = async (
  request: FastifyRequest<{
    Body: {
      id: string;
      data: {
        name: string;
        used: string;
        quantity: string;
      };
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const { id, data } = request.body;
    const str_id = id;
    const equipmentId = parseInt(str_id);

    if (isNaN(equipmentId)) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Invalid id",
      });
    } else if (isNaN(Number(data.used))) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Invalid used value",
      });
    } else if (isNaN(Number(data.quantity))) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Invalid quantity value",
      });
    }

    // Update the equipment in the database
    const updatedEquipment = await UpdateEquipmentById(equipmentId, data);

    return reply.code(200).send({
      data: updatedEquipment,
      msg: "Successful to update equipment",
      success: true,
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      msg: error,
    });
  }
};

export const deleteEquipmentByIdHandler = async (
  request: FastifyRequest<{
    Body: {
      id: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const id = parseInt(request.body.id);

    // Delete the equipment from the database
    const deletedEquipment = await DeleteEquipmentById(Number(id));
    if (!deletedEquipment) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to delete equipment",
      });
    }
    return reply.code(200).send({
      data: deletedEquipment,
      msg: "Successful to delete equipment",
      success: true,
    });
  } catch (error) {
    // code here
    return reply.code(500).send({
      success: false,
      msg: error,
    });
  }
};
// export const findEquipmentByBorrowingIdHandler = async (
//   request: FastifyRequest<{
//     Params: {
//       bw_id: string;
//     };
//   }>,
//   reply: FastifyReply
// ) => {
//   try {
//     // Add your logic here

//     if (request.params.bw_id!) {
//       return reply.code(400).send({
//         status: 400,
//         msg: "not found bw_id"
//       })
//     }

//     const bw_id = parseInt(request.params.bw_id)

//     if (isNaN(bw_id)) {
//       return reply.code(400).send({
//         status: 400,
//         msg: "not found bw_id"
//       })
//     }

//     const equipments = await
//   } catch (error) {
//     return reply.code(500).send({
//       success: false,
//       msg: error,
//     });
//   }
// };
