import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createUser, getUserByUsername } from "../service/validation.service";
import {
  LoginInput,
  SignupInput,
  signupSchema,
} from "../schema/validation.schema";
import { signJwt } from "../utils/jwt";
import validateSchema from "../middleware/validateSchema";

const validationHandler = express.Router();

validationHandler.post(
  "/signup",
  validateSchema(signupSchema),
  async (req: Request<{}, {}, SignupInput["body"]>, res: Response) => {
    try {
      const { username, password } = req.body;

      const existingUser = await getUserByUsername(username);
      if (existingUser) {
        return res
          .status(409)
          .json({ error: "User already exists. Please log in." });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = await createUser({
        username,
        password: encryptedPassword,
      });

      const token = signJwt({ username, _id: newUser._id });

      res.status(201).json({ _id: newUser._id, token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

validationHandler.post(
  "/login",
  async (req: Request<{}, {}, LoginInput["body"]>, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await getUserByUsername(username);

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = signJwt({ username, _id: user._id });

        res.status(200).json({ _id: user._id, token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default validationHandler;
