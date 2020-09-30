const router = require('express').Router();
const yup = require('yup');

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

router.post('/signup', async (req, res, next) => {
  const body = await req.body;

  try {
    const validatedBody = await signUpSchema.validate(body, { abortEarly: false })

    const user = await User.findOne({ email: body.email })

    if (user) {
      return res.status(400).json({message: 'Sorry, Email is already taken'});
    }

    await User.create(validatedBody);

    res.status(201).json({message: 'Registered successfully'});

  } catch (error) {
    next(error)
  }
  
});

router.post('/login', (req, res) => {
  res.send('Login route');
});

module.exports = router;