const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Busca un usuario por su nombre de usuario
 * @param {string} username - El nombre de usuario a buscar
 * @returns {Promise<Object|null>} - El usuario encontrado o null
 */
const getUser = async(username) => {
  try {
    const userFinded = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return userFinded; // Retorna los datos, no envía respuestas HTTP
  } catch (error) {
    throw error; // Propaga el error para que lo maneje el controlador
  }
};

module.exports = {
  getUser
};