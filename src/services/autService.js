const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();



const verifyByEmail = async (email) => {
    try {
        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {  // ¡Este es el problema!
                verified: true,
                verificationCode: null
            }
        })
        return user;
    } catch (error) {
        throw new Error("Error al verificar el codigo: " + error.message);
        
    }
}

const resetPassword = async(email, password) => {
    try {
        const user = await prisma.user.update({
            where:{
                email: email
            },
            data:{
                password: password,
                verificationCode: null
            }
        })
        return user;
    } catch (error) {
        throw new Error("Error al restablecer la contraseña: " + error.message);
    }
}


module.exports = {
    verifyByEmail,
    resetPassword
}