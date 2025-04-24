const comment_controller = require("../Controlers/Comment_controller")









express = require("express")

const comment_router = express.Router()

comment_router.post(

    "/add",


 

  

(req,res)=>{

    
        const result = new comment_controller().add(req.body)

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

comment_router.get(

    "/read/:id?",


  

(req,res)=>{

        const result = new comment_controller().read(req.params.id??null)
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




comment_router.delete(

    "/delete/:id",
 

  

(req,res)=>{

        const result = new comment_controller().delete(req.params.id)
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







module.exports= comment_router 