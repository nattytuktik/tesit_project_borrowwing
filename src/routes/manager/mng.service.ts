import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateManagerInputType } from "./mng.schema";
import { error } from "console";

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

//
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

//
export async function findsManyManager(query = {}) {
  try {
    const managers = await prisma.manager.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        user_name: true,
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
