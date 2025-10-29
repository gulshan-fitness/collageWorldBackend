const fileUpload = require("express-fileupload")

const authenticateToken = require("../Authentication")
const websitestory_controller = require("../Controlers/Website_stories_controller")




express = require("express")

const websitestory_router = express.Router()

websitestory_router.post(

    "/add",
    fileUpload(
        {
            createParentPath:true
        }
     ),

    authenticateToken,
(req,res)=>{


   
    

        const result = new websitestory_controller().add(req.body,req.files.thumbnail)

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

websitestory_router.get(

    "/read",
  

(req,res)=>{

        const result = new websitestory_controller().read()
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




websitestory_router.delete(

    "/delete/:id/:thumbnail",
 
    authenticateToken,
  

(req,res)=>{

        const result = new websitestory_controller().delete(req.params.id,req.params.thumbnail)
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







module.exports= websitestory_router 