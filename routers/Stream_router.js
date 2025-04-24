const fileUpload = require("express-fileupload")


const authenticateToken = require("../Authentication")
const stream_controller = require("../Controlers/Stream_controller")



express = require("express")



const stream_router=express.Router()



stream_router.post(

    "/add",

    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new stream_controller().add(req.body,req.files.image)
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


stream_router.get(

    "/read/:id?",

   

(req,res)=>{

        const result = new stream_controller().read(req.params.id??null)
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

stream_router.get(

    "/state_wise_stream",

   

(req,res)=>{

        const result = new stream_controller().state_wise_stream()
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








stream_router.delete(

    "/delete/:id/:old_logo",
    authenticateToken,
  

(req,res)=>{

        const result = new stream_controller().delete(req.params.id,req.params.old_logo)
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






module.exports= stream_router 