import { getAuth } from "@clerk/express";
import { Request, Response } from "express";

import * as arissServices from "../services/ariss.service";

export const syncUserController = async (req: Request, res: Response) => {
  let errorMessage;

  try {
    const { id, name, email, profilePicUrl, type } = req.body;

    const data = { id, name, email, profilePicUrl, type };
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
    res
      .status(201)
      .json({
        message: `${ariss.type} - New user added to database ${ariss.name}`,
        ariss,
      });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
