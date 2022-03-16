const asyncHandler = require('express-async-handler')
const Investor= require('../models/InvestorModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// get investors 
const getInvestors = asyncHandler(async (req , res) => {
    const investors = await Investor.find()
    res.status(200).json(investors)
})
//create investor
const SetInvestor = asyncHandler( async (req , res) => {
    if (!req.body.username|| !req.body.email || !req.body.password) {
        res.status(400)
        throw new Error('investor can t be empty ')
      }

    const investorExists = await Investor.findOne(req.body.email.value)

    if (!investorExists) {
      res.status(400)
      throw new Error('User already exists')
    }
    
    const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  req.body.password=hashedPassword

    const investor = await Investor.create(req.body)

    if (investor) {
      res.status(201).json({
        _id: investor.id,
        username: investor.username,
        email: investor.email,
        token: generateToken(investor._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
    

    
   
})


const loginInvestor = asyncHandler(async(req , res )=>{
  const { email, password } = req.body

  // Check for user email
  const investor = await Investor.findOne({ email })

  if (investor && (await bcrypt.compare(password, investor.password))) {
    res.json({
      _id: investor.id,
      name: investor.username,
      email: investor.email,
      token: generateToken(investor._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }

})


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

//update investor
const UpdateInvestor = asyncHandler(async (req , res) => {

    const investor = await Investor.findById(req.params.id)

  if (!investor) {
    res.status(400)
    throw new Error('investor not found')
  }
  const updatedInvestor = await Investor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

    res.status(200).json(updatedInvestor)
})

//delete investor 
const DeleteInvestor = asyncHandler(async (req , res) => {
    const investor = await Investor.findById(req.params.id)

    if (!investor) {
      res.status(400)
      throw new Error('investor not found')
    }

    await investor.remove()
    res.status(200).json({id : req.params.id})
})


const findInvestorById = asyncHandler ( async(req , res) => {
  const investor = await Investor.findById(req.params.id)
  res.status(200).json(investor)
})

module.exports = {
    getInvestors, SetInvestor ,UpdateInvestor ,DeleteInvestor, findInvestorById , loginInvestor
}