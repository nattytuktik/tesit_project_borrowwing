import { FastifyPluginAsync } from "fastify";
import {
  createEquipmentHandler,
  createManyEquipmentHandler,
  findEquipmentByIdHandler,
  findManyEquipmentHandler,
  uploadImageHandler,
  updateEquipmentHandler,
  deleteEquipmentByIdHandler,
} from "./eqt.controller";

const equipment: FastifyPluginAsync = async (fastify, opts) => {
  // Create Equipment
  fastify.post(
    "/",
    {
      preHandler: [fastify.authenticate],
    },
    createEquipmentHandler
  );

  // Create Many Equipment
  fastify.post(
    "/many",
    {
      preHandler: [fastify.authenticate],
    },
    createManyEquipmentHandler
  );

  fastify.get("/", findManyEquipmentHandler);
  fastify.get("/:id", findEquipmentByIdHandler);

  fastify.get("/bw/bw_id", findEquipmentByIdHandler);
  fastify.put("/update/image", uploadImageHandler);
  fastify.put("/", updateEquipmentHandler);
  fastify.post("/delete", deleteEquipmentByIdHandler);
};

export default equipment;
