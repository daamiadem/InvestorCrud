const mongoose = require('mongoose')

const investorSchema = mongoose.Schema({

    
      
    firstName: {
        type: String,
        required: [true, "Please enter your first name!"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name!"],
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
          if (!value.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
            throw new Error('Email is not valid.');
          }
        }
      },
    password: {
        type: String,
        required: [true, "Please enter your password!"]
    },
    sexe: {
        type: String,
        required: [true, "Please enter your sexe!"]
        
    },
    datOfBirth: {
        type: Date,
        required: [true, "Please enter your date of birth!"]
       
    },
    adress: {
        type: String,
        required: [true, "Please enter your adress!"]
        
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number!"]
        
    },

    accreditationStatus: {
        type: Number,
        required: [true, "Please enter your acreditation Status !"]
        
    },
    centerOfInterest: {
        type: String,
        required: [true, "Please enter your centerOfInterest!"]
        
    },

    image: {
        type: String,
        default: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
        
    }



    



})

module.exports = mongoose.model('invetstor', investorSchema)