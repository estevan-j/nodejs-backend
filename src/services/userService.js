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
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

/**
 * 
 * @returns {Promise<Array>} - Un array con todos los usuarios
 */
const getAllUsers = async() => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
}


/**
 * 
 * @param {string} email 
 * @returns {Promise<Object|null>} retorna un usuario por su email
 */
const getUserByEmail = async(email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    return user;
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
}


const createUser = async(user) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        email: user.email,
        recoveryEmail: user.recoveryEmail || null,
        isAdmin: false,
        verificationCode: user.verificationCode,
        verified: user.verified
      }
    })
    return newUser;
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
}

const updateUser = async(username, user) => {
  try {
    const user = await prisma.user.update({
      where: {
        username: username
      },
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        recoveryEmail: user.recoveryEmail || null,
        verified: user.verified,
        verificationCode: user.verificationCode,
        isAdmin: user.isAdmin
      }
    })
    return user;
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
}

const updatePatchUser = async(username, user) => {
  try {
    const validationResult = userSchema.partial().safeParse(user);
    if (!validationResult.success) {
      throw new Error('Datos inválidos: ' + validationResult.error.format());
    }
    const user = await prisma.user.update({
      where: {
        username: username
      },
      data: validationResult.data
    });
    return user;
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
}


const deleteUser = async(username) => {
  try {
    const user = await prisma.user.delete({
      where: {
        username: username
      }
    });
    return user;
  } catch (error) {
    throw new Error("Error al eliminar el usuario: " + error.message);
  }
}


module.exports = {
  getUser, 
  getAllUsers, 
  getUserByEmail,
  createUser,
  updatePatchUser,
  updateUser,
  deleteUser,
};