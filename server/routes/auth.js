const router = require('express').Router();
const yup = require('yup');
const { sign } = require('jsonwebtoken');
const Redis = require('ioredis');
const crypto = require('crypto');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const sendMail = require('../utils/sendMail');

const redis = new Redis({
  host: 'redis'
});

const FORGOT_PASSWORD_TOKEN = 'FORGOT_PASSWORD_TOKEN';

const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .required('First Name is required')
    .uppercase(),
  lastName: yup
    .string()
    .trim()
    .required('Last Name is required')
    .uppercase(),
  email: yup
    .string()
    .trim()
    .email('Email is invalid')
    .required('Email is required')
    .lowercase(),
  password: yup
    .string()
    .trim()
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm Password is required')
    .oneOf([
      yup.ref('password'), null
      ], `Passwords don't match`
    )
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Email is invalid')
    .required('Email is required')
    .lowercase(),
  password: yup
    .string()
    .trim()
    .required('Password is required')
});

const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .trim()
    .required('New Password is required'),
  confirmNewPassword: yup
    .string()
    .trim()
    .required('Confirm New Password is required')
    .oneOf([
      yup.ref('newPassword'), null
      ], `Passwords don't match`
    )
});

router.post('/signup', async (req, res, next) => {
  const body = await req.body;

  try {
    const validatedBody = await signUpSchema.validate(body, { abortEarly: false })

    const user = await User.findOne({ email: body.email })

    if (user) {
      return res.status(409).json({message: 'Sorry, Email is already taken'});
    }

    await User.create(validatedBody);

    res.status(201).json({message: 'Registered successfully'});

  } catch (error) {
    next(error)
  }
  
});

router.post('/login', async (req, res, next) => {
  const body = await req.body;

  try {
    const validatedBody = await loginSchema.validate(body, { abortEarly: false });

    const user = await User.findOne({ email: validatedBody.email });

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    const match = await user.comparePasswords(validatedBody.password);

    if (!match) return res.status(401).json({message: 'Incorrect password'});

    const token = sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({token})

  } catch(error) {
    next(error);
  }
});

router.post('/forgot-password', async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({message: 'Email is required'});
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({message: 'Email not found'});
    }

    const token = crypto.randomBytes(30).toString('hex')

    await redis.set(
      FORGOT_PASSWORD_TOKEN+token,
      user._id,
      'ex', 1000 * 60 * 60 * 24 * 1
    );

    sendMail(
      email,
      'RESET PASSWORD',
      `You are receiving this because you have requested the reset of the password for your account.\n
      Please click on the following link, or paste this into your browser to reset your password.\n
      If you did not request this, please ignore this email.\n
      <a href='http://localhost:3000/reset-password/${token}'>Reset Password</a>`
    );

    res.status(200).json({
      message: `Email sent to ${email}`
    });
  } catch(error) {
    next(error);
  }
  
});

router.post('/reset-password/:token', async (req, res, next) => {
  const body = await req.body;

  const { token:resetPasswordToken } = req.params;

  const key = FORGOT_PASSWORD_TOKEN + resetPasswordToken;

  try {

    const userId = await redis.get(FORGOT_PASSWORD_TOKEN + resetPasswordToken);

    if (!userId) return res.status(403).json({message: 'Token expired.'})

    const hashedPassword = await bcryptjs.hash(body.newPassword, 12);

    await resetPasswordSchema.validate(body, { abortEarly: false });

    await User.findByIdAndUpdate(userId, {
      password: hashedPassword
    });

    await redis.del(key);

    res.status(200).json({
      message:'Password reset successfully'
    });

  } catch(error) {
    next(error);
  }
});

module.exports = router;