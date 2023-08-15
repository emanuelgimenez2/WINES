require('dotenv').config()
const { Router } = require('express');
const router = Router();
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (msg) => {
    try {
        await sgMail.send(msg)        
    } catch (error) {
        console.log(error)
    }
}

router.post('/', function (req, res, next) {
    const {to, html, subject} = req.body
    try{
        sendMail({
            to,
            from: 'pgvinos@gmail.com',
            subject,
            html
        })
        res.send('mensaje enviado!')
    }catch(error){
        next(Error)
    }
   
  })

  module.exports = router;
  