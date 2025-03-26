const userService = require('../services/userService');

const getUser = async(req, res) => {
  try {
    const user = req.params.user;
    const userFinded = await userService.getUser(user);
    if (!userFinded) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({message: 'User found', email: userFinded.email});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
}


module.exports = {
  getUser,
};