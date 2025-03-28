const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();



const verifyByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            data: {
                verified: true,
                verificacionCode: null
            }
        })
        return user;
    } catch (error) {
        throw new Error("Error al verificar el codigo: " + error.message);
        
    }
}

const resetPassword = async(email, password) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                email: email
            },
            data:{
                password: password,
                verificacionCode: null
            }
        })
        return user;
    } catch (error) {
        throw new Error("Error al restablecer la contraseña: " + error.message);
    }
}


exports.module = {
    verifyByEmail,
    resetPassword
}