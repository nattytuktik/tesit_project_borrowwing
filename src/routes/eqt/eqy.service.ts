import { CreateEquimentInputType } from "./eqt.schema";
import prisma from "../../utils/prisma";

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

// Insert Many
export const CreateManyEquiments = async (input: CreateEquimentInputType[]) => {
  try {
    // inserts
    const eqts = await prisma.equiment.createMany({
      data: input,
      skipDuplicates: true,
    });

    if (eqts) {
      return eqts;
    }
  } catch (e) {
    console.log(e);
    return false;
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
