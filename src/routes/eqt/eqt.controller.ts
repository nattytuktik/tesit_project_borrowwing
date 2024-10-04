import { FastifyRequest, FastifyReply } from "fastify";
import { CreateEquimentInputType } from "./eqt.schema";
import { CreateEquiment } from "./eqy.service";

// handler

export const createEquimentHandler = async (
  request: FastifyRequest<{
    Body: CreateEquimentInputType;
  }>,
  reply: FastifyReply
) => {
  try {
    // verifi requestBody
    const body = request.body;

    // insert into datebase
    const createEquiment = await CreateEquiment(body);

    if (!createEquiment) {
      return reply.code(500).send({
        msg: "INTERNAL Server Error",
      });
    }

    //response

    return reply.code(200).send({
      result: createEquiment,
      msg: "Inserr Equiment Successfull",
    });
  } catch (e) {
    reply.code(500).send({
      status: 0,
      msg: e,
    });
  }
};

// create Many Equiments
export const createEquimentManyHandler = async (
  request: FastifyRequest<{
    Body: CreateEquimentInputType[];
  }>,
  reply: FastifyReply
) => {
  try {
  } catch (e) {
    //debug
    return reply.code(500).send(e);
  }
};
