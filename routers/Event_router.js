const fileUpload = require("express-fileupload")


const authenticateToken = require("../Authentication")
const event_controller = require("../Controlers/Event_controller")



express = require("express")



const event_router = express.Router()




event_router.post(

    "/add",

 fileUpload(
    {
        createParentPath:true
    }
 ),
 authenticateToken,
  

(req,res)=>{

    
        const result = new event_controller().add(req.body,req.files.logo)

        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )

    }
)

event_router.get(

    "/read/:id?/:collage_id?",


  
    
(req,res)=>{

        const result = new event_controller().read(req.params.id??null, req.params.collage_id??null,req.query??null)
        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )

    }
)





event_router.delete(

    "/delete/:id/:logo",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new event_controller().delete(req.params.id,req.params.logo)
        result.then(
            (succes)=>{
                res.send( succes)
            }
        )
        
        .catch(
            (error)=>{
                res.send( error) 
            }
        )

    }
)







module.exports= event_router 