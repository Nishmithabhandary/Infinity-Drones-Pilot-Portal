// handles storing new test created 
const { check } = require("express-validator");
const pool=require("../database");


//get all flight  details  

module.exports.totalsuccesfulflights= async (req, res) => {
    try {
     console.log("hello welcome..................")
      var total_succesfulflights= await pool.query("select count(flight_id) from flight_description where result=true and date=CURRENT_DATE;");
      console.log(total_succesfulflights.rows);
      console.log(total_succesfulflights.rows[0].count+"hellonitte")
      return total_succesfulflights.rows[0].count;
    }
    catch (e) {
      console.error(e)
      res.json({
        errors: 'Invalid'
      });
  
    }
  }

  module.exports.totalcrashes= async (req, res) => {
    try {
     console.log("hello welcome..................")
      var total_crashes= await pool.query("select count(flight_id) from flight_description where result=false and date=CURRENT_DATE;");
      console.log(total_crashes.rows);
      console.log(total_crashes.rows[0].count+"hellonitte")
    
      return total_crashes.rows[0].count;
    }
    catch (e) {
      console.error(e)
      res.json({
        errors: 'Invalid'
      });
  
    }
  }