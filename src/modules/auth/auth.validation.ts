import z from "zod";

export const userRegisterSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})
export type UserRegisterInput = z.infer<typeof userRegisterSchema>


export const userLoginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})
export type UserLoginInput = z.infer<typeof userLoginSchema>