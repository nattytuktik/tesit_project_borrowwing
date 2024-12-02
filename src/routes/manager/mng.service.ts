import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateManagerInputType } from "./mng.schema";
import { error } from "console";

/**
 *
 * @CeateManager
 */
export const createManager = async (input: CreateManagerInputType) => {
  const manager = input;

  const { hash, salt } = hashPassword(manager.password);

  const createManager = await prisma.manager.create({
    data: {
      first_name: manager.first_name,
      last_name: manager.last_name,
      user_name: manager.user_name,
      password: hash,
      salt: salt,
      tel: manager.tel,
    },
  });

  return createManager;
};

/**
 * @findManagerByUserName
 * @param user_name
 * @returns
 */
export const findManagerByUsername = async (user_name: string) => {
  try {
    const manager = await prisma.manager.findUnique({
      where: {
        user_name: user_name,
      },
    });

    return manager === null ? null : manager;
  } catch (e) {
    console.log(e);
    return error(e);
  }
};

/**
 * @FindMantManger
 * @param query
 * @returns
 */
export async function findsManyManager(query = {}) {
  try {
    const managers = await prisma.manager.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        user_name: true,
      },
      where: {
        status: "ALREALY",
      },
    });

    if (!managers) {
      return [];
    } else {
      return managers;
    }
  } catch (e) {
    return [];
  }
}

/**
 * @DeLete_By_field
 */
export async function deleteManagerByUsername(input_userName: string) {
  try {
    const manager = await prisma.manager.update({
      where: {
        user_name: input_userName,
      },
      data: {
        status: "OFF",
      },
    });

    return manager;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * @Update_Manager
 */
export async function findManagerByUserNameAndPassword(query: {
  user_name: string;
  password: string;
}) {
  try {
    const manager = await prisma.manager.findFirst({
      where: {
        user_name: query.user_name,
        password: query.password,
        status: "ALREALY",
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        user_name: true,
      },
    });

    // if not found
    if (!manager) {
      return null;
    } else {
      return manager;
    }
  } catch (error) {}
}
