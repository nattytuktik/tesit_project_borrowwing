import { FastifyRequest, FastifyReply } from "fastify";
import { CreateEquimentInputType } from "./eqt.schema";
import {
  CreateEquiment,
  CreateManyEquiments,
  FindEquimentByName,
  FindManyEquiments,
} from "./eqy.service";

/**
 *
 * Create Equiment
 */
export const createEquimentHandler = async (
  request: FastifyRequest<{
    Body: CreateEquimentInputType;
  }>,
  reply: FastifyReply
) => {
  try {
    // verifi requestBody
    const equimentBodyRequest = request.body;

    // find equiment
    const findEquiment = await FindEquimentByName(equimentBodyRequest.name);

    if (findEquiment) {
      return reply.code(400).send({
        status: 0,
        msg: "Equiment Already Exists",
      });
    }
    // insert into datebase
    const createEquiment = await CreateEquiment(equimentBodyRequest);

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

/**
 *
 *
 * Create Many Equiment
 */
export const createManyEquimentHandler = async (
  request: FastifyRequest<{
    Body: CreateEquimentInputType[];
  }>,
  reply: FastifyReply
) => {
  try {
    // verifi requestBody
    const equimentBodyRequest = request.body;

    const equiments = await CreateManyEquiments(equimentBodyRequest);

    if (!equiments) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to create many equiments",
      });
    }
    return reply.code(200).send({
      result: equiments,
      msg: "Successfull to create many equiments",
    });
  } catch (e) {
    //debug
    return reply.code(500).send({
      success: false,
      massages: e,
    });
  }
};

/**
 *
 *
 *
 * find many equiment
 */
export const findManyEquimentHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    // find all equiments
    const equiments = await FindManyEquiments();

    if (!equiments) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to find many equiments",
      });
    }
    return reply.code(200).send({
      data: equiments,
      msg: "Successfull to find many equiments",
      success: true,
    });
  } catch (e) {
    //debug
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
