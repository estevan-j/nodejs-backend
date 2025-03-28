const { verifyAcc, login, requestResetPassword, resetPassword } = require("./authController");
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
    login,
    requestResetPassword,
    resetPassword
}