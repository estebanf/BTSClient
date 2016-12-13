'use strict';

var rp = require('request-promise');

export function sendMessage(approved,req,res){
  var data = {
    "bts:Get_customer_decisionRequest":{
      "@xmlns":{
        "bts":"http://bts.com/Processes/Core/ContentTransmissionBooking/BTS",
        "bts1":"http://www.example.org/BTS"
      },
      "bts1:RequestId":{
        $:req.params.id
      },
      "bts1:approved":{
        $:approved
      }
    }
  };
  var opt = {
    uri:(process.env.BPMHOST || 'http://ubuntu.estebanf.com:8080/everteam') + '/ode/processes/BTS/Processes/Core/ContentTransmissionBooking/BTS/Client',
    method:'POST',
    headers:{
      'Content-Type':'application/json/badgerfish'
    },
    body: JSON.stringify(data)
  }
  rp(opt).then(function(parsedBody){
    return res.redirect(304,'/approval');
  });

}
