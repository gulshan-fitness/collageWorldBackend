const admin_controllers = require("../Controlers/Admin_controller")

express = require("express")

const admin_routers = express.Router()





admin_routers.post(

    "/sign_up",

(req,res)=>{

 

        const result = new admin_controllers().sign_up(req.body)
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



admin_routers.post(
    "/login",

    (req,res)=>{
    
       
    
            const result = new admin_controllers().login(req.body)
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










module.exports= admin_routers  