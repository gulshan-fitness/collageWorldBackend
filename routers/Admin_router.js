const admin_controllers = require("../Controlers/Admin_controller")

express = require("express")

const admin_routers = express.Router()
const authenticateToken= require("./../Authentication")





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




admin_routers.get(

    "/AdminVerify/:id",
    
    authenticateToken,

    (req,res)=>{
    
       
    
            const result = new admin_controllers().AdminVerify(req.params.id)
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


admin_routers.get(
    "/read",
  

    (req,res)=>{
    
       
    
            const result = new admin_controllers().read()
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

admin_routers.patch(
    "/approve/:id",
    authenticateToken,

    (req,res)=>{
    
       
    
            const result = new admin_controllers().approve(req.params.id)
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

admin_routers.patch(
    "/college_idRemove/:id",
    authenticateToken,

    (req,res)=>{
    
       
    
            const result = new admin_controllers().college_idRemove(req.params.id)
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

admin_routers.patch(
    "/collage_id_Change/:id/:collage_id",
    authenticateToken,

    (req,res)=>{

            const result = new admin_controllers().collage_id_Change(req.params.id,req.params.collage_id)

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

admin_routers.delete(
    "/delete/:id",
    authenticateToken,

    (req,res)=>{
    
       
    
            const result = new admin_controllers().delete(req.params.id)
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