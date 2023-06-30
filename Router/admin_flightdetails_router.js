const express = require("express");
const flightdetails = require("../Controller/admin_flightdetails_controller");
const router = express.Router();



//get list of flight details already in db
router.get("/newflightdetails", async (req, res) => {
   console.log("hi")
   logindetails = req.body
   console.log(logindetails+"123");
   console.log(flightdetails)
  {    
      console.log("hello this to check d..........")
      var d = await flightdetails.succesfulflightdetails(req, res);
      console.log(d+"this is d..................");
      var n = d.length;
      console.log(n)
      res.render('flightdetails', { layout: false,  flight:d, detail: logindetails, flight_id: " " });
      
   }
   
});


//get list of crash details already in db
router.get("/crashdetails", async (req, res) => {
    console.log("hi")
    logindetails = req.body
    console.log(logindetails+"123");
    console.log(flightdetails)
   {    
       console.log("hello this to check d..........")
       var d = await flightdetails.crashdetails(req, res);
       console.log(d+"this is d..................");
       var n = d.length;
       naa=JSON.stringify(d);
       console.log(n)
       console.log("check  check check..........................")
       console.log(naa)
       console.log("check check......................")

       
       res.render('crashdetails', { layout: false,  flight:d, detail: logindetails, flight_id: " " });
       
    }
    
 });

 /*delete succesful flight details*/
router.post("/all_succesfulflightdetails", async (req, res) => {
    var name = req.body;
    console.log(name)
    console.log(name.deletessuccesfulflightdetails+'deletedID====----------')
    console.log(name.flight_id+'deletedID====----------')
    console.log(name)
    console.log("trialdemo----------")
    
    console.log("trialdemo----------")
    if (name.deletessuccesfulflightdetails!= undefined) {
        var remove = await flightdetails.deletessuccesfulflightdetails(req, res);
        console.log('checkingggggg--------')
        console.log(remove);
        console.log('checkingggggg--------')
      
         var a = await flightdetails.succesfulflightdetails(req, res);
         var s = await flightdetails.get_succesfulflightdetails(req, res);

        console.log("deleted succesfully...")
        res.render('flightdetails', { layout: false, flight:a,flight_id:req.body});
 }
 else
 if (name.editsuccesfulflightdetails!= undefined) {
     var edits = await flightdetails.edit_succesfulflightdetails(req, res);
      console.log("this is to check successfulflight_details................") 
      console.log(edits);
      console.log("this is to check successfulflight_details................") 
     var d = await flightdetails.get_succesfulflightdetails(req, res);
      console.log(d);
     console.log("hiiiiiiiiiii")
         res.render('edit_succesful_flight_details', { layout: false, schedule_details: edits });
     
 }
 
  }
)

 
/*Edit succesful flight details*/
router.post("/edit_succesfulflightdetails", async (req, res) => {
    console.log("edit");
    console.log("error debugging successful....")
    var Edit = await flightdetails.editsuccesfulflightdetails(req, res);
    console.log(Edit)
    console.log("Edited Succesfully...")
    flight_id=req.body;
    var a = await flightdetails.succesfulflightdetails(req, res);
    var d = await flightdetails.get_succesfulflightdetails(req, res);
    res.render('flightdetails', { layout: false, flight:a,flight_id:req.body.flight_id })
   })
   

/*delete crash details*/

router.post("/all_crashdetails", async (req, res) => {
    var name = req.body;
    console.log(name)
    console.log(name.deletecrashdetails+'deletedID====----------')
    console.log(name.flight_id+'deletedID====----------')
    console.log(name)
    console.log("trialdemo----------")
    
    console.log("trialdemo----------")
    if (name.deletecrashdetails!= undefined) {
        var remove = await flightdetails.deletecrashdetails(req, res);
        console.log('checkingggggg--------')
        console.log(remove);
        console.log('checkingggggg--------')
      
        var d = await flightdetails.crashdetails(req, res);
        console.log(d+"this is d..................");
        var n = d.length;
        console.log(n)
        console.log("deleted succesfully...");
        res.render('crashdetails', { layout: false,  flight:d, detail: logindetails, flight_id: " " });
     
 }
 else
 if (name.editcrashdetails!= undefined) {
     var edits = await flightdetails.edit_crashdetails(req, res);
      console.log("this is to check crash_details................") 
      console.log(edits);
      console.log("this is to check crash_details................") 
     var d = await flightdetails.get_crashdetails(req, res);
      console.log(d);
     console.log("hiiiiiiiiiii")
         res.render('edit_crash_details', { layout: false, schedule_details: edits });
     
 }
 
  }
)

/*Edit crash details*/
router.post("/edit_crashdetails", async (req, res) => {
    console.log("edit");
    console.log("error debugging successful....")
    var Edit = await flightdetails.editcrashdetails(req, res);
    console.log(Edit)
    console.log("Edited crash details successfully...")
    flight_id=req.body;
    var b = await flightdetails.crashdetails(req, res);
    var a = await flightdetails.detailedcrashdetails(req, res);
    var d = await flightdetails.get_crashdetails(req, res);
    res.render('crashdetails', { layout: false, flight:b,flight_id:req.body.flight_id })
   })
 
/*Edit succesful flight details*/
router.post("/edit_succesfulflightdetails", async (req, res) => {
    console.log("edit");
    console.log("error debugging successful....")
    var Edit = await flightdetails.editsuccesfulflightdetails(req, res);
    console.log(Edit)
    console.log("Edited Succesfully...")
    flight_id=req.body;
    var a = await flightdetails.succesfulflightdetails(req, res);
    var d = await flightdetails.get_succesfulflightdetails(req, res);
    res.render('flightdetails', { layout: false, flight:a,flight_id:req.body.flight_id })
   })
   


 
  

module.exports=router;