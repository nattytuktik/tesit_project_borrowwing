import { CreateEquimentInputType } from "./eqt.schema";
import prisma from "../../utils/prisma";
import { ServicesError } from "../../utils/error.type";

export const CreateEquiment = async (input: CreateEquimentInputType) => {
  try {
    const eqt = await prisma.equiment.create({
      data: input,
    });
    return eqt;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Create Many Equiments
export const CreateManyEquiments = async (input: CreateEquimentInputType[]) => {
  try {
    // inserts
    const eqts = await prisma.equiment.createMany({
      data: input,
      skipDuplicates: true,
    });

    return eqts;
  } catch (e) {
    throw new ServicesError("Failed to create many equiments");
  }
};

// find equiment by name
export const FindEquimentByName = async (name: string) => {
  try {
    const eqt = await prisma.equiment.findFirst({
      where: {
        name: name,
      },
    });

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to find equiment");
  }
};

// delete One
export const DeleteEuquimentById = async (id: number) => {};

// delete many
export const DeleteEquimentByid = async () => {};

// status OFF
export const ChangeStatusOFF = async () => {};

// Change Status ON
export const ChangeStatusON = async () => {};
