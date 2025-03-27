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
    } catch (error) {
        throw new Error("Error al verificar el codigo: " + error.message);
        
    }
}



exports.module = {

}