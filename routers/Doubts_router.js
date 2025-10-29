

const authenticateToken = require("../Authentication")
const doubts_controller = require("../Controlers/Doubts_controllers")

express = require("express")


const doubts_router = express.Router()



doubts_router.post(

    "/add",
    authenticateToken,

(req,res)=>{

        const result = new doubts_controller().add(req.body)
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


doubts_router.get(

    "/read/:id?/:collage_id?",

   

(req,res)=>{

        const result = new doubts_controller().read(req.params.id??null,req.params.collage_id??null)
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


doubts_router.put(

    "/edit/:id",

    authenticateToken,

(req,res)=>{

        const result = new doubts_controller().edit(req.params.id,req.body)
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

doubts_router.delete(

    "/delete/:id",
    authenticateToken,
  

(req,res)=>{

        const result = new doubts_controller().delete(req.params.id)
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






module.exports= doubts_router 