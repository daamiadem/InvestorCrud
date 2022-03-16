const express = require ('express')
const router = express.Router()
const {getInvestors,DeleteInvestor, SetInvestor,UpdateInvestor , findInvestorById , loginInvestor} = require('../controllers/investorController')

router.get('/' , getInvestors)

router.get('/investorId/:id' ,findInvestorById )

router.post('/newInvestor' , SetInvestor)


router.put ('/ubdateInvestor/:id' , UpdateInvestor)


router.delete('/deleteInvestor/:id' , DeleteInvestor)

router.post('/loginInvestor' , loginInvestor)






module.exports = router