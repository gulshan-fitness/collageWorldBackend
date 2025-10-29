

const authenticateToken = require("../Authentication")
const agent_controller = require("../Controlers/Agent_controller")


express = require("express")


const agent_router = express.Router()
const fileUpload = require("express-fileupload")








agent_router.post(

    "/add",
    fileUpload({
        createParentPath:true
    }),
    authenticateToken,

(req,res)=>{

        const result = new agent_controller().add(req.body,req.files.Profile)
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


agent_router.get(

    "/read/:id?/:college_id?",

  

(req,res)=>{

        const result = new agent_controller().read(req.params.id??null,req.params.college_id??null ,req.query??null)
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



agent_router.delete(

    "/delete/:id/:old_profile",
    authenticateToken,
  

(req,res)=>{

        const result = new agent_controller().delete(req.params.id,req.params.old_profile)
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






module.exports= agent_router 