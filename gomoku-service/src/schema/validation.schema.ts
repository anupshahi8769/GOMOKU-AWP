import {object, string, number, array, TypeOf, union} from "zod";

const payload = {
    body: object({
        username: string({
            required_error:"Username is required",
        }),
        password: string({
            required_error:"Password is required",
        }),
    })
};

export const signupSchema = object({
    ...payload
})

export const loginSchema = Object ({
    ...payload
})

export type RegisterInput = TypeOf<typeof signupSchema>;
export type LoginInput = TypeOf<typeof loginSchema>;