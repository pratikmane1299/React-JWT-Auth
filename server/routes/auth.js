const router = require('express').Router();
const yup = require('yup');
const { sign } = require('jsonwebtoken');

const User = require('../models/user');

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

module.exports = router;