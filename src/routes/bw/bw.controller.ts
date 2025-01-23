import { FastifyReply, FastifyRequest } from "fastify";
import { CreateBwInputType } from "./bw.schema";
import {
  createBwService,
  findBorrowwingByCustomerId,
  findManyBwService,
} from "./bw.service";
import { findCustomerById } from "../customer/customer.service";
import { findManagerByUserNameAndPassword } from "../manager/mng.service";

/**
 *
 * @param request
 * @param reply
 */
export const createBwHandler = async (
  request: FastifyRequest<{
    Body: {
      customer_id: number;
      start_date: string;
      end_date: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    // verifi requestBody
    const bwBodyRequest: CreateBwInputType = {
      ...request.body,
      manager_id: 0,
    };

    const customer = await findCustomerById(bwBodyRequest.customer_id);

    // find customer
    if (!customer) {
      // response if customer not found
      return reply.code(400).send({
        status: 0,
        msg: "Customer not found",
      });
    }

    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return reply.code(401).send({
        message: "Authentication required",
        success: false,
      });
    }

    const admin = await request.jwt.verify<{
      user_name: string;
      password: string;
    }>(token);

    // const manage

    const managers = await findManagerByUserNameAndPassword({
      user_name: admin.user_name,
      password: admin.password,
    });

    if (!managers) {
      return reply.code(400).send({
        status: 0,
        msg: "admin not found",
      });
    } else if (bwBodyRequest.manager_id === 0) {
      return reply.code(400).send({
        status: 0,
        msg: "admin not found",
      });
    }
    bwBodyRequest.manager_id = managers.id;

    // insert into datebase
    const createBw = await createBwService(bwBodyRequest);
    if (!createBw) {
      //response if failed to create
      return reply.code(400).send({
        status: 0,
        msg: "Failed to create Borrowwing",
      });
    } else {
      // response if successfull to create
      return reply.code(200).send({
        result: createBw,
        msg: "Inserr Borrowwing Successfull",
      });
    }

    //response
  } catch (error) {
    return reply.code(500).send({
      success: false,
      msg: error,
    });
  }
};

/**
 *
 * @param request
 * @param reply
 * @returns
 */
export const findOneBwHandler = async (
  request: FastifyRequest<{
    Params: { customer_id: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const customerid = parseInt(request.params.customer_id);

    console.log(customerid);
    // find many Borrowwings
    if (customerid) {
      const Borrowwings = await findBorrowwingByCustomerId(customerid);
      if (!Borrowwings) {
        return reply.code(400).send({
          status: 0,
          success: false,
          msg: "Failed to find one Borrowwings",
        });
      }
      return reply.code(200).send({
        data: Borrowwings,
        msg: "Successfull to find one Borrowwings",
        success: true,
      });
    } else {
      // find all Borrowwings
      const Borrowwings = await findManyBwService();

      if (!Borrowwings) {
        return reply.code(400).send({
          status: 0,
          success: false,
          msg: "Failed to find many Borrowwings",
        });
      }
      return reply.code(200).send({
        data: Borrowwings,
        msg: "Successfull to find many Borrowwings",
        success: true,
      });
    }
  } catch (e) {
    return reply.code(500).send({
      success: false,
      msg: e,
    });
  }
};

/**
 * sub contontroller
 */
