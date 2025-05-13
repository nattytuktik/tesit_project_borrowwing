import { CreateEquipmentInputType } from "./eqt.schema";
import prisma from "../../utils/prisma";
import { ServicesError } from "../../utils/error.type";

export const CreateEquipment = async (input: CreateEquipmentInputType) => {
  try {
    const eqt = await prisma.equipment.create({
      data: input,
    });
    return eqt;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// Create Many Equipments
export const CreateManyEquipments = async (
  input: CreateEquipmentInputType[]
) => {
  try {
    // inserts
    const eqts = await prisma.equipment.createMany({
      data: input,
      skipDuplicates: true,
    });

    return eqts;
  } catch (e) {
    throw new ServicesError("Failed to create many equipments");
  }
};

// find many equipments
export const FindManyEquipments = async () => {
  try {
    const eqts = await prisma.equipment.findMany({
      where: {
        status: "ALREALY",
      },
    });

    return eqts;
  } catch (e) {
    throw new ServicesError("Failed to find many equipments");
  }
};

// find equipment by name
export const FindEquipmentByName = async (name: string) => {
  try {
    const eqt = await prisma.equipment.findFirst({
      where: {
        name: name,
      },
    });

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to find equipment");
  }
};

export const FindEquipmentById = async (id: number) => {
  try {
    const eqt = await prisma.equipment.findFirst({
      where: {
        id: id,
        status: "ALREALY",
      },
    });

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to find equipment");
  }
};

// delete One
export const DeleteEquipmentById = async (id: number) => {
  try {
    const eqt = await prisma.equipment.update({
      where: {
        id: id,
      },
      data: {
        status: "DELETED",
      },
    });

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to delete equipment");
  }
};

// delete many
export const DeleteManyEquipmentById = async (ids: number[]) => {
  try {
    const eqt = await prisma.equipment.updateMany({
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
    throw new ServicesError("Failed to delete many equipments");
  }
};

// status OFF
export const ChangeStatusOFF = async (id: number) => {
  try {
    const eqt = await prisma.equipment.update({
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
    const eqt = await prisma.equipment.update({
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
    const eqt = await prisma.equipment.updateMany({
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

export const UpdateImageNameById = async (id: number, name: string) => {
  try {
    const eqt = await prisma.equipment.update({
      where: {
        id: id,
      },
      data: {
        image: name,
      },
    });

    if (!eqt) {
      throw new ServicesError("Failed to update equipment name");
    }
    // check if eqt is null

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to update equipment name");
  }
};

export const UpdateEquipmentById = async (
  id: number,
  data: {
    name: string;
    used: string;
    quantity: string;
  }
) => {
  try {
    const eqt = await prisma.equipment.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        used: Number(data.used),
        quantity: Number(data.quantity),
      },
    });

    if (!eqt) {
      throw new ServicesError("Failed to update equipment");
    }

    return eqt;
  } catch (e) {
    throw new ServicesError("Failed to update equipment");
  }
};
// find Equipment by Borrowing Id
