import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const generateToken = (userId, displayName, role) => {
  return jwt.sign({ userId, displayName, role },
    process.env.JWT_SECRET,
    { expiresIn: '1h', }
  );
}

const checkUserExist = async (email) => {
  const user = await User.findOne({ email });
  console.log(user);
  return user;
}

const generatePassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function register(req, res) {
  try {
    const { displayName, email, role, avatar, phone } = req.body;
    console.log('Body', req.body);
    const userExist = await checkUserExist(email);
    console.log(userExist);
    if (userExist) {
      return res.status(400).json({ message: 'User already exist' });
    }
    const hashPassword = await generatePassword(req.body.password);
    console.log(hashPassword);

    const newUser = new User({
      displayName,
      email,
      hashPassword,
      role,
      avatar,
      phone
    });
    await newUser.save();
    res.status(201).json({
      displayName,
      email,
      role,
      avatar,
      phone
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const userExist = await checkUserExist(email);
    if (!userExist) {
      return res.status(400).json({ message: 'User does not exist. You have to sign in' });
    }
    const isMatch = await bcrypt.compare(password, userExist.hashPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(userExist._id, userExist.displayName, userExist.role);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server error' });
  }
}

export { register, login };