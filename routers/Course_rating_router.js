



const course_rating_controller = require("../Controlers/Course_rating_controller")


express = require("express")

const course_rating_router = express.Router()

course_rating_router.post(

    "/add",


(req,res)=>{

    
        const result = new course_rating_controller().add(req.body)

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

course_rating_router.get(

    "/read/:id?",


  

(req,res)=>{

        const result = new course_rating_controller().read(req.params.id??null)
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










course_rating_router.delete(

    "/delete/:id",
   

  

(req,res)=>{

        const result = new course_rating_controller().delete(req.params.id)
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







module.exports= course_rating_router 