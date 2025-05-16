import { FastifyReply, FastifyRequest } from "fastify";
import { CreateBwInputType, TReservate } from "./bw.schema";
import {
  createBwService,
  deleteBwByIdService,
  findBorrowwingByCustomerId,
  FindBorrowwingServive,
  FindBwById,
  findManyBwService,
  UpdateBwPandding,
  UpdateReservate,
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
      address: string;
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

    // get token from header
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // check token
    if (!token) {
      return reply.code(401).send({
        message: "Authentication required",
        success: false,
      });
    }

    // verify token
    const admin = await request.jwt.verify<{
      user_name: string;
      password: string;
    }>(token);

    // find manager by username and password
    const managers = await findManagerByUserNameAndPassword({
      user_name: admin.user_name,
      password: admin.password,
    });

    // not found manager
    if (!managers) {
      return reply.code(400).send({
        status: 0,
        msg: "admin not found",
      });
    }

    // push manager_id to body request
    bwBodyRequest.manager_id = managers.id;

    // not found manager
    if (managers === null || managers === undefined) {
      return reply.code(400).send({
        status: 0,
        msg: "admin not found",
      });
    }
    // not found manager
    else if (bwBodyRequest.manager_id === 0) {
      return reply.code(400).send({
        status: 0,
        msg: "admin not found",
      });
    }

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
    console.log(error);
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
export const findBwByCustomerIdHandler = async (
  request: FastifyRequest<{
    Params: { customer_id: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const customerid = parseInt(request.params.customer_id);

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

export const findBorrowwingById = async (
  request: FastifyRequest<{
    Params: {
      id: string;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const bw_id = parseInt(request.params.id);

    const bw = await FindBwById(bw_id);

    if (bw) {
      return reply
        .send({
          data: bw,
          maasages: "successfully",
        })
        .status(200);
    }

    return reply
      .send({
        data: null,
        massages: "not found with this id",
      })
      .status(404);
  } catch (error) {
    console.log(error);
    return reply.code(500).send({
      success: false,
      msg: error,
    });
  }
};

/**
 * sub contontroller
 */

export const findManyBorrowwingHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const findBorrowwinges = await FindBorrowwingServive();

    if (findBorrowwinges) {
      return reply
        .send({
          data: findBorrowwinges,
          status: true,
        })
        .status(200);
    }

    return reply.code(400).send({
      status: 0,
      success: false,
      msg: "Failed to find Borrowwings",
    });
  } catch (error) {
    console.log(error);
    return reply.code(500).send({
      success: false,
      msg: error,
    });
  }
};

export const updatePanddingHandler = async (
  request: FastifyRequest<{
    Body: {
      id: string;
      reservates: Array<TReservate>;
    };
  }>,
  reply: FastifyReply
) => {
  // code here

  try {
    const bw_id = parseInt(request.body.id);

    if (!bw_id) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to find Borrowwing",
      });
    }

    const updateReservate = await UpdateReservate(request.body.reservates);
    if (!updateReservate) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to find Borrowwing",
      });
    }
    const result = await UpdateBwPandding(bw_id);

    if (result) {
      return reply
        .send({
          data: result,
          status: true,
        })
        .status(200);
    }
    return reply.code(400).send({
      status: 0,
      success: false,
      msg: "Failed to find Borrowwing",
    });
  } catch (error) {
    // code here
    return reply.code(500).send({
      success: false,
      msg: error,
    });
  }
};

export const deleteBwHandler = async (
  request: FastifyRequest<{
    Body: {
      id: number;
      reservates: Array<TReservate>;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const bw_id = request.body.id;
    const reservates = request.body.reservates;
    if (!bw_id) {
      return reply.code(400).send({
        status: 0,
        success: false,
        msg: "Failed to find Borrowwing",
      });
    }

    const delBw = await deleteBwByIdService(bw_id);

    if (reservates.length > 0) {
      // const reuseReservates = await UpdateReservate(reservates);

      await UpdateReservate(reservates);
    }

    if (delBw) {
      return reply
        .send({
          data: delBw,
          status: true,
        })
        .status(200);
    }

    return reply.code(400).send({
      status: 0,
      success: false,
      msg: "Failed to delete Borrowwing",
    });
  } catch (error) {
    return reply.code(500).send({
      success: false,
      msg: error,
    });
  }
};