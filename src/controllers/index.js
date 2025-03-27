const { verifyAcc, login } = require("./authController");
const { getUser, getAllUsers, getUserByEmail, updatePatchUser, updateUser, deleteUser, createUser } = require("./userControlloers");




module.exports = {
    getUser,
    getAllUsers,
    getUserByEmail,
    updatePatchUser,
    updateUser,
    deleteUser,
    createUser,
    verifyAcc,
    login
}