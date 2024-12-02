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

// find many equiments
export const FindManyEquiments = async () => {
  try {
    const eqts = await prisma.equiment.findMany({
      where: {
        status: "ALREALY",
      },
    });

    return eqts;
  } catch (e) {
    throw new ServicesError("Failed to find many equiments");
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
export const DeleteEuquimentById = async (id: number) => {
  try {
    const eqt = await prisma.equiment.update({
      where: {
        id: id,
      },
      data: {
        status: "DELETED",
      },
    });

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to delete equiment");
  }
};

// delete many
export const DeleteManyEuquimentById = async (ids: number[]) => {
  try {
    const eqt = await prisma.equiment.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        status: "DELETED",
      },
    });

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to delete many equiments");
  }
};

// status OFF
export const ChangeStatusOFF = async (id: number) => {
  try {
    const eqt = await prisma.equiment.update({
      where: {
        status: "ON",
        id: id,
      },
      data: {
        status: "OFF",
      },
    });

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to change status OFF");
  }
};

// Change Status ON
export const ChangeStatusON = async (id: number) => {
  try {
    const eqt = await prisma.equiment.update({
      where: {
        status: "OFF",
        id: id,
      },
      data: {
        status: "ON",
      },
    });

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to change status ON");
  }
};

// Change Status ON Many
export const ChangeStatusONMany = async (ids: number[]) => {
  try {
    const eqt = await prisma.equiment.updateMany({
      where: {
        status: "OFF",
        id: {
          in: ids,
        },
      },
      data: {
        status: "ON",
      },
    });

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to change status ON many");
  }
};
