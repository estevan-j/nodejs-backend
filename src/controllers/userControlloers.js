const userService = require('../services/userService');
const { hashPassword, generateVerificationCode, hashVerificationCode } = require('../utils/helpers');
const {registerUserSchema} = require('../utils/ValidationSchema.js');

const getUser = async(req, res) => {
  try {
    const user = req.params.user;
    const userFinded = await userService.getUser(user);
    if (!userFinded) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({message: 'User found', response: userFinded.email});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
}


const getAllUsers = async(req, res) => {
  try {
    const users = await userService.getAllUsers();
    if (!users) {
      return res.status(404).json({ message: 'Users not found' });
    }
    res.status(200).json({message: 'Users found', response: users.map(user => ({
      email: user.email,
      username: user.username
    }))});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
}


const createUser = async(req, res) => {
  try {
    const userData = req.body;
    if (!registerUserSchema.safeParse(userData)){
      return res.status(400).json({ message: 'Invalid data', response: registerUserSchema.errors });
    } 
    if (await userService.getUserByEmail(userData.email)) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    if (await userService.getUser(userData.username)) {
      return res.status(409).json({ message: 'Username already in use' });
    }
    const hashedPassword = await hashPassword(userData.password);
    userData.password = hashedPassword;
    const verificationCode = generateVerificationCode();
    const hashedVerificationCode = await hashVerificationCode(verificationCode);
    userData.verificacionCode = hashedVerificationCode;
    userData.verified = false;
    const userCreated = await userService.createUser(userData);
    res.status(201).json({ message: 'User created', response: {id: userCreated.id, username: userCreated.username, email: userCreated.email} });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
}

const updateUser = async(req, res) => {
  try {
    const { user } = req.params;
    const userUpdateData = req.body;
    const validationResult = userSchema.partial().safeParse(userUpdateData);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: 'Invalid data', 
        response: validationResult.error.format() 
      });
    }
    await userService.updateUser(user, validationResult.data);
    return res.status(200).json({ message: 'User updated' }); 
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error });
  }
}


const updatePatchUser = async(req, res) => {
  try {
    const { user } = req.params;
    const userUpdateData = req.body;
    const validationResult = userSchema.partial().safeParse(userUpdateData);
    if (!validationResult.success) {
      return res.status(400).json({
        message: 'Invalid data',
        response: validationResult.error.format()
      });
    }
    await userService.updateUser(user, validationResult.data);
    return res.status(200).json({ message: 'User updated', message: `${user} was updated`, data: req.body.email });
  } catch (error) { 
    return res.status(500).json({ message: 'Error updating user', response: error.message });
  }
}

const getUserByEmail = async(req, res) => {
  try {
    const email = req.params.email;
    // Validar formato del email
    try {
      userSchema.shape.email.parse(email);
    } catch (validationError) {
      return res.status(400).json({ 
        message: 'Invalid email format', 
        errors: validationError.format() 
      });
    }
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User found', response: user });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user', error });
  }
}

const deleteUser = async(req, res) => {
  try {
    const user = req.params.user;
    if (!user) {
      return res.status(400).json({ message: 'User not provided' });
    }
    if (!await userService.getUser(user)) {
      return res.status(404).json({ message: 'User not found' });
    }
    await userService.deleteUser(user);
    return res.status(200).json({ message: 'User deleted', response: `${user} was deleted` });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', response: error.message });
  }
}



module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  updatePatchUser,
};