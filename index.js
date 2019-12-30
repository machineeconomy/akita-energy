var paymentModule = require('iota-payment')
var express = require('express')
var app = express()
var cors = require('cors')
const fs = require('fs');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

app.use(cors())

app.use('/', express.static('frontend/dist'));

app.get("/info", (req, res) => {
    paymentModule.getBalance()
        .then(balance => {
            console.log(balance)
            res.send({
                name: process.env.NAME,
                message: 'hello world!', 
                balance: balance
            });
        })
        .catch(err => {
        console.log(err)
        })
});

var options = {
    websockets: true,
    api: true
    // ...
}

let server = paymentModule.createServer(app, options)


//Create an event handler which is called, when a payment was successfull
var onPaymentSuccess = function (payment) {

    console.log("onPaymentSuccess", payment)
    console.log("PROVIDER_URL", process.env.PROVIDER_URL)

    var url = process.env.PROVIDER_URL;

    var data = {
        "name": "akita_wind_energy",
        "description": "Pay for energy taxes"
    }
    axios.post(url + "/payments", data)
      .then(function (response) {
        
        console.log("result", response.status)
        if(response.status === 200) {
            console.log("body", response.data)
            let open_payment = response.data.payment
            let payoutObject = {
                //required
                address: open_payment.address, 
                value: open_payment.value, 
                //optional
                message: 'Pay for energy taxes',
                tag: 'AKITAENERGY'
            }
            paymentModule.payout.send(payoutObject)
            .then(result => {
                console.log("result", result)
            })
            .catch(err => {
                console.log(err)
            })
        }
      })
      .catch(function (error) {
          
        console.log("ERRORORORORO");
        console.log(error);
      });
   

}

paymentModule.on('paymentSuccess', onPaymentSuccess);

// Start server with iota-payment module on '/custom'
server.listen(5001, function () {
    console.log(`Server started on http://localhost:5001 `)
})

