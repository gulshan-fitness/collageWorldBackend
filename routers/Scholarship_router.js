
const authenticateToken = require("../Authentication")
const scholarship_controller = require("../Controlers/Scholarship_controller")

express = require("express")


const scholarship_router = express.Router()








scholarship_router.post(

    "/add",
    authenticateToken,

(req,res)=>{

        const result = new scholarship_controller().add(req.body)
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


scholarship_router.get(

    "/read/:id?/:collage_id?",

    

(req,res)=>{

        const result = new scholarship_controller().read(req.params.id??null,req.params?.collage_id??null)
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


scholarship_router.put(

    "/edit/:id",

    authenticateToken,

(req,res)=>{

        const result = new scholarship_controller().edit(req.params.id,req.body)
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

scholarship_router.delete(

    "/delete/:id",
    authenticateToken,
  

(req,res)=>{

        const result = new scholarship_controller().delete(req.params.id)
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






module.exports= scholarship_router 