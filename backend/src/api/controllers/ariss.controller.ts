import { getAuth } from "@clerk/express";
import { Request, Response } from "express";

import * as arissServices from "../services/ariss.service";
import { ArissUserType } from "@prisma/client";

export const syncUserController = async (req: Request, res: Response) => {
  let errorMessage;

  try {
    const { id, name, email, profilePicUrl } = req.body;

    const data = { id, name, email, profilePicUrl };
    if (!data) {
      errorMessage = "Required fields are missing";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const ariss = await arissServices.syncUserService(data);
    res.status(201).json({
      message: `${ariss.type} - New user added to database ${ariss.name}`,
      ariss,
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchAllArissUsersController = async (
  req: Request,
  res: Response,
) => {
  let errorMessage;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const typeParam = req.query.type;

    if (
      typeParam &&
      !Object.values(ArissUserType).includes(typeParam as ArissUserType)
    ) {
      return res.status(400).json({
        error: "Invalid user type",
      });
    }

    const ariss = await arissServices.fetchAllArissUsersService(
      (typeParam as ArissUserType) ?? null,
    );
    res.status(200).json({ total: ariss.length, ariss });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  let errorMessage;

  try {
    // const { userId } = getAuth(req);
    // if (!userId) {
    //   errorMessage = "Unauthorized: Invalid token";
    //   console.log(errorMessage);
    //   return res.status(401).json({ error: errorMessage });
    // }

    const { id } = req.params;
    if (!id) {
      errorMessage = "ID is required is params";
      console.log(errorMessage);
      return res.status(400).json({ error: errorMessage });
    }

    const ariss = await arissServices.deleteArissUserService(id as string);
    res.status(204).json({ message: "ARISS user deleted", ariss });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
