import { FastifyPluginAsync } from "fastify";
import {
  createBwHandler,
  deleteBwHandler,
  findBorrowwingById,
  findBwByCustomerIdHandler,
  findManyBorrowwingHandler,
  updatePanddingHandler,
} from "./bw.controller";


const bowwing: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/customer/:customer_id", findBwByCustomerIdHandler);
  fastify.get("/:id", findBorrowwingById);
  fastify.get("/", findManyBorrowwingHandler);
  fastify.post("/", createBwHandler);
  fastify.put("/update/pandding", updatePanddingHandler);
  fastify.post("/delete", deleteBwHandler);
};

export default bowwing;
