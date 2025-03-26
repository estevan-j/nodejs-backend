// This file is intentionally left blank.

const { z } = require("zod");

const userSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    recoveryEmail: z.string().email().optional(),
    verificacionCode: z.string().optional(),
    isAdmin: z.boolean().default(false),
    isVerified: z.boolean().default(false),
});


module.exports = {
    userSchema
};