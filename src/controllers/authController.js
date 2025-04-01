const { sendEmail } = require("../config/email.config.js");
const { authService, userService } = require("../services");
const { verifyCode, comparePassword, generateVerificationCode, hashVerificationCode } = require("../utils/helpers");
const { verifyAccSchema, loginSchema, userSchema } = require("../utils/ValidationSchema.js");
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
        res.status(400).json({status: 400, message: "Error verifying user", error: error.message });
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
        res.status(500).json({ status: 500, message: "Error logging in", error: error.message });
    }
}

const requestResetPassword = async (req, res) => {
    try {
        const userData = req.body;
        const validationResult = userSchema.shape.email.safeParse(userData.email);
        if (!validationResult.success) {
            return res.status(400).json({ message: "Invalid email", response: validationResult.error.errors });
        }
        const user = await userService.getUserByEmail(userData.email);
        if (!user){
            return res.status(404).json({ message: "User not found", response: "Usuario no existente" });
        }
        const verificationCode = generateVerificationCode();
        const hashedVerficationCode = await hashVerificationCode(verificationCode);
        await userService.updatePatchUser(user.username, {verificationCode: hashedVerficationCode});
        await sendEmail(userData.email, "Reset Password", `Your verification code is: ${verificationCode}`);
        res.status(200).json({ message: "Verification code sent", response: "Se ha enviado un correo con el codigo de verificacion" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error requesting reset password", error: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const userData = req.body;
        const email = decodeURIComponent(req.params.email);
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found", response: "Usuario no existente" });
        }
        if (!user.verified){
            return res.status(409).json({ message: "User not verified", response: "Usuario no verificado" });
        }
        if (!user.verificationCode) {
            return res.status(409).json({ message: "Verification code not found", response: "Codigo de verificacion no encontrado" });
        }
        const isCodeValid = await verifyCode(userData.verificationCode, user.verificationCode);
        if (!isCodeValid) {
            return res.status(409).json({ message: "Invalid verification code", response: "Codigo de verificacion incorrecto" });
        }
        const hashedPassword = await hashVerificationCode(userData.password);
        const updatedUser = await authService.resetPassword(email, hashedPassword);
        if (!updatedUser) {
            return res.status(404).json({ message: "Password Reset Error", response: "No se completo el cambio de contrasena" });
        }
        await sendEmail(email, "Password Reset", "Your password has been reset successfully");
        res.status(200).json({ message: "Password reset successfully", response: "Contraseña restablecida correctamente" });
    } catch (error) {
        res.status(500).json({ status: 500, message: "Error resetting password", error: error.message });
    }
}

module.exports = {
    verifyAcc,
    login,
    requestResetPassword,
    resetPassword
}