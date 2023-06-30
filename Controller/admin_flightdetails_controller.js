// handles storing new test created 
const { check } = require("express-validator");
const pool=require("../database");

//get all flight  details  

module.exports.flightdetails = async (req, res) => {
  try {
   console.log("hello welcome..................")
    var flight_details = await pool.query("select flight_id,mode,date,drone_id,emailid,duration,result,batteryid,takeoffvoltage,landingvoltage,windspeed,winddirection,copilot from flight_description");
    console.log(flight_details.rows);
    console.log("hello nishmitha..................")
    console.log(flight_details.rows[0].flight_id+"hellonitte")
    return flight_details.rows;
  }
  catch (e) {
    console.error(e)
    res.json({
      errors: 'Invalid'
    });

  }
}

module.exports.get_flightdetails = async (req, res) => {
  try {
    var get_flightdetails = await pool.query("select mode,date,drone_id,emailid,duration,result,batteryid,takeoffvoltage,landingvoltage,windspeed,winddirection,copilot from flight_description where flight_id=$1",[req.body.flight_id]);
    
   
    return get_flightdetails.rows;
  }
  catch (e) {
    console.error(e)
    res.json({
      errors: 'Invalid'
    });

  }
}

/*All succesful flight details*/
module.exports.succesfulflightdetails = async (req, res) => {
    try {
     console.log("hello welcome..................")
      var succesfulflight_details = await pool.query("select flight_id,mode,date,drone_id,emailid,duration,batteryid,takeoffvoltage,landingvoltage,windspeed,winddirection,copilot from flight_description where result=true");
      console.log(succesfulflight_details.rows);
      console.log("hello nishmitha..................")
      console.log(succesfulflight_details.rows[0].flight_id+"hellonitte")
      return succesfulflight_details.rows;
    }
    catch (e) {
      console.error(e)
      res.json({
        errors: 'Invalid'
      });
  
    }
  }

module.exports.get_succesfulflightdetails = async (req, res) => {
    try {
      var get_succesfulflightdetails = await pool.query("select mode,date,drone_id,emailid,duration,batteryid,takeoffvoltage,landingvoltage,windspeed,winddirection,copilot from flight_description where result=true and flight_id=$1",[req.body.flight_id]);
      
     
      return get_succesfulflightdetails.rows;
    }
    catch (e) {
      console.error(e)
      res.json({
        errors: 'Invalid'
      });
  
    }
  }
  
/*All Crash details*/
module.exports.crashdetails = async (req, res) => {
    try {
     console.log("hello welcome..................")
      var crash_details = await pool.query('select f.flight_id,date,f.emailid,copilot,drone_name,damaged_parts,reason from flight_description f,crash c where f.flight_id=c.flight_id and f.result=false')
      console.log(crash_details.rows);
      console.log("hello nishmitha..................")
      console.log(crash_details.rows[0].flight_id+"hellonitte")
      return crash_details.rows;
    }
    catch (e) {
      console.error(e)
      res.json({
        errors: 'Invalid'
      });
  
    }
  }

module.exports.get_crashdetails = async (req, res) => {
    try {
      var get_crashdetails = await pool.query("select f.flight_id,date,f.emailid,copilot,drone_name,damaged_parts,reason from flight_description f,crash c where f.flight_id=c.flight_id and f.result=false and f.flight_id=$1",[req.body.flight_id]);
      
     
      return get_crashdetails.rows;
    }
    catch (e) {
      console.error(e)
      res.json({
        errors: 'Invalid'
      });
  
    }
  }
  
  /*Delete succesful flight details*/

module.exports.deletessuccesfulflightdetails = async (req, res) => {
   try {
       var remove = []
       var Data = req.body;
       console.log(Data)
       console.log("qb")
       var details = await pool.query("select * from flight_description where result=true")
       console.log(details.rows[0].flight_id)
       console.log("hello")
       var b = await pool.query("delete from flight_description where flight_id =$1", [Data.deletessuccesfulflightdetails])
         
           console.log(b)


       
   var new_list_after_delete = await pool.query("select flight_id, mode,date,drone_id,emailid,duration,batteryid,takeoffvoltage,landingvoltage,windspeed,winddirection,copilot from flight_description");
       console.log(new_list_after_delete.rows);
       console.log("New flight details...")
       return new_list_after_delete.rows;

   } catch (err) {
       console.log(err)
       res.status(401).json("Cannot Delete a succesful flight details........")
   }
}


/*edit succesful flight details*/

module.exports.editsuccesfulflightdetails = async (req, res) => {
    try {
        var flightinfo = req.body
        console.log("this is to debug the code.......................")
        console.log(flightinfo)
        console.log(flightinfo.flight_id+"helloworld12345")
        console.log("1")
        
        var edit_succesfulflightdetails = await pool.query("update flight_description set mode=$1,date=$2,drone_id=$3,emailid=$4,duration=$5,result=$6,batteryid=$7,takeoffvoltage=$8,landingvoltage=$9,windspeed=$10,winddirection=$11,copilot=$12 where flight_id=$13", [flightinfo.mode, flightinfo.date, flightinfo.drone_id, flightinfo.emailid, flightinfo.duration, flightinfo.result,flightinfo.batteryid, flightinfo.takeoffvoltage, flightinfo.landingvoltage,flightinfo.windspeed, flightinfo.winddirection, flightinfo.copilot,flightinfo.flight_id])
        console.log(edit_succesfulflightdetails);
        console.log("edited")
        var after_edit_successfulflight_list = await pool.query("select flight_id,mode,date,drone_id,emailid,duration,batteryid,takeoffvoltage,landingvoltage,windspeed,winddirection,copilot,result from flight_description where result=true");
        console.log(after_edit_successfulflight_list.rows);
        console.log("after")
        return after_edit_successfulflight_list.rows;
    } catch (err) {
        console.log(err)
        res.status(401).json('Cannot Edit flight details..........')
    }
 };
 
 
 module.exports.edit_succesfulflightdetails = async (req, res) => {
    try {
        var editData = req.body
        
        var edit_info = await pool.query("select * from flight_description where result=true and flight_id=$1", [editData.editsuccesfulflightdetails]);
        console.log("edittinnng...")
        console.log(edit_info.rows);
        return edit_info.rows[0];
 
    }
    catch (e) {
        console.error(e)
        res.json({
            errors: 'Invalid'
        });
 
    }
 }
 
 /*delete crash details*/


module.exports.deletecrashdetails = async (req, res) => {
    try {
        var remove = []
        var Data = req.body;
        console.log(Data)
        console.log("qb")
        var details = await pool.query("select * from flight_description,crash where flight_description.flight_id=crash.flight_id and result=false")
        console.log(details.rows[0].flight_id)
        console.log("hello")
        var b = await pool.query("DELETE FROM flight_description USING crash WHERE flight_description.flight_id = crash.flight_id AND flight_description.flight_id=$1 AND crash.flight_id =$2;", [Data.deletecrashdetails,Data.deletecrashdetails])
          
            console.log(b)
        
    var new_list_after_delete = await pool.query("select flight_id,drone_name,damaged_parts,reason,emailid from crash");
        console.log(new_list_after_delete.rows);
        console.log("New flight details...")
        return new_list_after_delete.rows;
 
    } catch (err) {
        console.log(err)
        res.status(401).json("Cannot Delete a crash  details........")
    }
 }
 
 
/*edit crash details*/

module.exports.editcrashdetails = async (req, res) => {
    try {
        var flightinfo = req.body
        console.log("this is to debug the editcrashdetails code.......................")
        console.log(flightinfo)
        console.log(flightinfo.flight_id+"helloworld12345")
        console.log("1")
        var edit_crashdetails = await pool.query("UPDATE flight_description SET mode=$1,date=$2,drone_id=$3,emailid=$4, duration=$5,result=$6,batteryid=$7,takeoffvoltage=$8,landingvoltage=$9,windspeed=$10,winddirection=$11,copilot=$12 WHERE flight_id =$13", [flightinfo.mode, flightinfo.date, flightinfo.drone_id, flightinfo.emailid, flightinfo.duration, flightinfo.result,flightinfo.batteryid, flightinfo.takeoffvoltage, flightinfo.landingvoltage,flightinfo.windspeed, flightinfo.winddirection, flightinfo.copilot,flightinfo.flight_id])
        var edit_crashdetails2 = await pool.query("UPDATE crash SET drone_name=$1,damaged_parts=$2,reason=$3 WHERE flight_id =$4", [flightinfo.drone_name, flightinfo.damaged_parts, flightinfo.reason,flightinfo.flight_id])
        console.log(edit_crashdetails);
        console.log(edit_crashdetails2);
        console.log("edited crash details............")
        var after_edit_crashdetails_list = await pool.query("select * from crash,flight_description where flight_description.flight_id=crash.flight_id");
        console.log( after_edit_crashdetails_list .rows);
        console.log("after")
        return  after_edit_crashdetails_list .rows;
    } catch (err) {
        console.log(err)
        res.status(401).json('Cannot Edit flight details..........')
    }
 };
 
 
 module.exports.edit_crashdetails = async (req, res) => {
    try {
        var editData = req.body
        
        var edit_info = await pool.query("select f.flight_id,f.mode,f.date,f.drone_id,f.emailid,f.duration,f.batteryid,f.takeoffvoltage,f.landingvoltage,f.windspeed,f.winddirection,f.copilot,f.result,c.drone_name,c.damaged_parts,c.reason from flight_description f,crash c where f.flight_id=c.flight_id and c.flight_id=$1", [editData.editcrashdetails]);
        console.log("edittinnng...")
        console.log(edit_info.rows);
        return edit_info.rows[0];
 
    }
    catch (e) {
        console.error(e)
        res.json({
            errors: 'Invalid'
        });
 
    }
 }

 /*list of crash details along with flight_description table content*/
 module.exports.detailedcrashdetails = async (req, res) => {
  try {
   console.log("hello welcome..................")
    var detailedcrash_details = await pool.query('select f.flight_id,f.mode,f.date,f.drone_id,f.emailid,f.duration,f.result,f.batteryid,f.takeoffvoltage,f.landingvoltage,f.windspeed,f.winddirection,f.copilot,c.drone_name,c.damaged_parts,c.reason from flight_description f,crash c where f.flight_id=c.flight_id and f.result=false')
    console.log("hello this is detailed crash details.................")
    console.log(detailedcrash_details.rows);
    console.log("hello this is detailed crash details.................")
    console.log(detailedcrash_details.rows[0].flight_id+"hell this is crash id to be detailed")
    return detailedcrash_details.rows;
  }
  catch (e) {
    console.error(e)
    res.json({
      errors: 'Invalid'
    });

  }}