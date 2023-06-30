const express = require("express");
const flightdetails=require("../Controller/admin_dashboard_controller");
const router = express.Router();
router.get('/admin',async(req,res)=>{
    {
    var a = await flightdetails.totalsuccesfulflights(req, res);
    
    var b= await flightdetails.totalcrashes(req, res);
    console.log("total number of succesful flights and crashes....");
    console.log(a);
    console.log(b);
    console.log("total number of succesful flights and crashes....")
    }
    res.render('admin', { layout: false,  successful:a ,crashes:b});
})

