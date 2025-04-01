const { verifyAcc, login, requestResetPassword, resetPassword } = require("./authController");
const { getUser, getAllUsers, updatePatchUser, updateUser, deleteUser, createUser, getUserByEmail } = require("./userControlloers");




module.exports = {
    getUser,
    getAllUsers,
    updatePatchUser,
    updateUser,
    deleteUser,
    createUser,
    verifyAcc,
    login,
    requestResetPassword,
    resetPassword,
    getUserByEmail
}