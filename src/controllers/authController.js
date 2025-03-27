const { response } = require("express");
const { sendEmail } = require("../config/email.config.js");
const { authService, userService } = require("../services");
const { verifyCode, comparePassword } = require("../utils/helpers");
const { verifyAccSchema, loginSchema } = require("../utils/ValidationSchema.js");
const { generateToken } = require("../config/jwt.js");



const verifyAcc = async (req, res) => {
    try {
        const userData = req.body;
        if (!verifyAccSchema.safeParse(userData)) {
            return res.status(400).json({ message: "Invalid data", response: verifyAccSchema.errors });
        }
        const user = await userService.getUserByEmail(userData.email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.verified) {
            return res.status(409).json({ message: "User already verified" });
        }
        const isCodeValid = await verifyCode(userData.verificationCode, user.verificationCode);
        if (!isCodeValid) {
            return res.status(409).json({ message: "Invalid verification code" });
        }
        const updatedUser = await authService.verifyByEmail(userData.email);
        if (!updatedUser) {
            return res.status(200).json({ message: "User verified", response: updatedUser.email });
        }
        await sendEmail(updatedUser.email,  "¡Felicidades! Cuenta verificada correctamente", 
            "¡Felicidades! Tu cuenta ha sido verificada correctamente.Ahora puedes disfrutar de todos los beneficios de nuestra plataforma. Gracias por confiar en nosotros. Saludos, El equipo de soporte");
        res.status(200).json({ message: "User verified Sucessfully", response: "Se ha enviado un correo de confirmacion" });        
    } catch (error) {
        res.status(500).json({ message: "Error verifying user", error: error.message });
    }
}  

const login = async (req, res) => {
    try {
        const userData = req.body;
        const user = await userService.getUserByEmail(userData.email);
        if (!loginSchema.safeParse(userData)) {
            return res.status(400).json({ message: "Invalid data", response: loginSchema.errors });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found", response: "Usuario no existente" });
        }
        if (!user.verified) {
            return res.status(409).json({ message: "User not verified", response: "Usuario no verificado" });
        }
        if (!await comparePassword(userData.password, user.password)) {
            return res.status(409).json({ message: "Invalid password", response: "Contraseña incorrecta" });
        }
        const token = generateToken(user);
        res.status(200).json({message: "Welcome to the platform", response: "Bienvenido a la plataforma", token: token});
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
}


module.exports = {
    verifyAcc,
    login
}