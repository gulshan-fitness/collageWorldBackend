
const authenticateToken = require("../Authentication")
const faculty_controller = require("../Controlers/Faculty_controller")



express = require("express")


const faculty_router = express.Router()








faculty_router.post(

    "/add",
    authenticateToken,

(req,res)=>{

        const result = new faculty_controller().add(req.body)
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


faculty_router.get(

    "/read/:id?/:college_id?",
    

(req,res)=>{

        const result = new faculty_controller().read(req.params.id??null,req.params.college_id??null)
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



faculty_router.delete(

    "/delete/:id",

    authenticateToken,

(req,res)=>{

        const result = new faculty_controller().delete(req.params.id)
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






module.exports= faculty_router 