import { FastifyReply, FastifyRequest } from "fastify";
import {
  createManager,
  deleteManagerByUsername,
  findManagerByUsername,
  findsManyManager,
} from "./mng.service";
import { CreateManagerInputType, LoginSchemaInputType } from "./mng.schema";
import { verifyPassword } from "../../utils/hash";

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Register Manager Handler
 */
export const registorManagerHandler = async (
  request: FastifyRequest<{
    Body: CreateManagerInputType;
  }>,
  reply: FastifyReply
) => {
  try {
    const body = request.body;

    // find old manager
    const findAlrealyManager = await findManagerByUsername(body.user_name);

    if (findAlrealyManager) {
      const badRequestMassages = {
        code: 400,
        details: "you were registor or username is alrealy used",
      };
      return reply.code(400).send(badRequestMassages);
    }

    // registor
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
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Login Handler
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

      reply.setCookie("access_token", accessToken, {
        path: "/",
        secure: true,
        httpOnly: true,
      });
      return {
        success: true,
        accessToken,
      };
    }
    // not match
    return reply.code(400).send({
      magesses: "login failed",
      detail: request.body,
    });
  } catch (error) {
    return reply.code(500).send({
      error: "Internal Server Error",
      details: error,
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
 *
 *
 *
 *
 *
 *
 *  FINDS_MANY_MANAGER
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

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *  DELETE_STATUS_OF
 */

export async function deleteManagerHandler(
  request: FastifyRequest<{
    Body: {
      username: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const { username } = request.body;

    const manager = await findManagerByUsername(username);
    if (!manager) {
      return reply.code(404).send({ error: "Manager not found" });
    }

    // "Soft delete" the manager by updating its status field

    const deleteManager = await deleteManagerByUsername(manager.user_name);

    if (!deleteManager) {
      return reply.code(500).send({
        error: "Internal Server Error",
        details: "Someting Error At [Function] = deleteMangerbyUsername ",
      });
    }
    return reply.code(200).send({ message: "Manager marked as deleted" });
  } catch (e) {
    return reply.code(500).send({ error: "Internal Server Error", details: e });
  }
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Logout_Handler
 */
export async function logoutHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    reply.clearCookie("access_token");
  } catch (e) {
    reply.code(500).send({
      error: "Internal Server Error",
      details: e,
    });
  }
}
