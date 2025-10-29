

const authenticateToken = require("../Authentication")
const story_controller = require("../Controlers/Story_controller")



express = require("express")

const story_router = express.Router()

story_router.post(

    "/add",
    authenticateToken,
(req,res)=>{

        const result = new story_controller().add(req.body)

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

story_router.get(

    "/read/:id?/:collage_id?",
  

(req,res)=>{

        const result = new story_controller().read(req.params.id??null, req.params.collage_id??null)
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




story_router.delete(

    "/delete/:id",
 
    authenticateToken,
  

(req,res)=>{

        const result = new story_controller().delete(req.params.id)
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







module.exports= story_router 