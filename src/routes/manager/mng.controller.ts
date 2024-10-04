import { FastifyReply, FastifyRequest } from "fastify";
import {
  createManager,
  findManagerByUsername,
  findsManyManager,
} from "./mng.service";
import { CreateManagerInputType, LoginSchemaInputType } from "./mng.schema";
import { verifyPassword } from "../../utils/hash";

/**
 *
 * @param request
 * @param reply
 * @returns
 */
export const createManagerHandler = async (
  request: FastifyRequest<{
    Body: CreateManagerInputType;
  }>,
  reply: FastifyReply
) => {
  try {
    const body = request.body;
    const newManager = await createManager(body);

    return newManager;
  } catch (e) {
    reply.code(500).send({
      status: 0,
      msg: e,
    });
  }
};

/**
 *
 * @param request
 * @param reply
 * @returns
 */
export const loginHandler = async (
  request: FastifyRequest<{
    Body: LoginSchemaInputType;
  }>,
  reply: FastifyReply
) => {
  try {
    // find manager by user_name

    const body = request.body;

    const manager = await findManagerByUsername(body.user_name);

    // not found manager
    if (!manager) {
      return reply.code(401).send({
        massage: "Invalid user_name or password",
      });
    }
    // varify password
    const correctPassword = verifyPassword({
      candidatePassword: body.password,
      salt: manager.salt,
      hash: manager.password,
    });

    //response
    if (correctPassword) {
      const { password, salt, ...rest } = manager;

      const accessToken = request.server.jwt.sign(rest);

      return { accessToken: accessToken };
    }
    // not match

    return reply.code(400).send({
      magesses: "not log in",
    });
  } catch (error) {}
};

/**
 *
 *
 */
export async function findsManagerHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  //
  try {
    const managers = await findsManyManager({});

    if (managers) {
      return reply.send(managers);
    } else {
      return [];
    }
  } catch (e) {
    return reply.code(500).send(e).send({
      masseges: "Inernal error at findCustomerHandler",
    });
  }
}
