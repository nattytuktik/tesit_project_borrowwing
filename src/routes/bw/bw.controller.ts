import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../utils/prisma";
import { CreateBwInputType } from "./bw.schema";

const createBwHandler = async (request: FastifyRequest<{Body: CreateBwInputType}>, reply: FastifyReply ) => {

   const BorrowwingFromRequest = request.body

   // create Borrowwing
   const createBorrowwing = await prisma.borrowing.create({
      data:{
         ...BorrowwingFromRequest
      }
   })

   
   try {
      reply.send(createBorrowwing)
      console.log(BorrowwingFromRequest)
   }catch(err) {
      reply.code(500).send(err)
   }
}


export {
   createBwHandler
}