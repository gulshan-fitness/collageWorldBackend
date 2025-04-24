

const authenticateToken = require("../Authentication")
const agent_controller = require("../Controlers/Agent_controller")


express = require("express")


const agent_router = express.Router()








agent_router.post(

    "/add",
    authenticateToken,

(req,res)=>{

        const result = new agent_controller().add(req.body)
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

    "/read/:id?",

  

(req,res)=>{

        const result = new agent_controller().read(req.params.id??null)
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

    "/delete/:id",
    authenticateToken,
  

(req,res)=>{

        const result = new agent_controller().delete(req.params.id)
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