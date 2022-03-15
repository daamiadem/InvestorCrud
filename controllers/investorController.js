const asyncHandler = require('express-async-handler')
const Investor= require('../models/InvestorModel')

// get investors 
const getInvestors = asyncHandler(async (req , res) => {
    const investors = await Investor.find()
    res.status(200).json(investors)
})
//create investor
const SetInvestor = asyncHandler( async (req , res) => {
    if (!req.body.firstName) {
        res.status(400)
        throw new Error('investor can t be empty ')
      }
    

    
    const investor = await Investor.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email ,
      password: req.body.password,
      sexe: req.body.sexe,
      datOfBirth: req.body.datOfBirth,
      adress: req.body.adress,
      phoneNumber: req.body.phoneNumber,
      accreditationStatus: req.body.accreditationStatus,
      centerOfInterest: req.body.centerOfInterest,
      image: req.body.image
    })
    

    
    res.status(200).json(investor)
})

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
    getInvestors, SetInvestor ,UpdateInvestor ,DeleteInvestor, findInvestorById
}