import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUser, getUserByUsername } from "../service/validation.service";
import {
  InputLogin,
  InputRegister,
  schemaRegister,
} from "../schema/validation.schema";
import { signJwt } from "../utils/jwt";
import validateSchema from "../middleware/validateSchema";

const validationHandler = express.Router();

validationHandler.post(
  "/register",
  validateSchema(schemaRegister),
  async (req: Request<{}, {}, InputRegister["body"]>, res: Response) => {
    try {
      const { username, password } = req.body;
      console.log(req.body)
      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return res
          .status(409)
          .send({ error: "User already exists. Please log in." });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await createUser({
        username,
        password: encryptedPassword,
      });

      const token = signJwt({ username, _id: newUser._id });

      res.status(200).json({ _id: newUser._id, token });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  }
);

validationHandler.post(
  "/login",
  async (req: Request<{}, {}, InputLogin["body"]>, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await getUserByUsername(username);

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = signJwt({ username, _id: user._id });
        return res.status(200).json({_id: user._id, token});
      } 
      return res.status(400).send('Invalid Credentials')
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }
);

export default validationHandler;
