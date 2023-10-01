import { object, string, number, array, TypeOf, union } from "zod";

const payload = {
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
};

export const schemaRegister = object({
  ...payload,
});

export const schemaLogin = Object({
  ...payload,
});

export type InputRegister = TypeOf<typeof schemaRegister>;
export type InputLogin = TypeOf<typeof schemaLogin>;
