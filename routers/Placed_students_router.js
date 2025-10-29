const fileUpload = require("express-fileupload")

const placed_students_controller = require("../Controlers/Placed_students_controller")
const authenticateToken = require("../Authentication")


express = require("express")


const Placed_student_router = express.Router()








Placed_student_router.post(

    "/add",

    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,
(req,res)=>{

        const result = new placed_students_controller().add(req.body,req.files.student_image)
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


Placed_student_router.get(

    "/read/:id?/:collage?",

   

(req,res)=>{

        const result = new placed_students_controller().read(req.params.id??null,req.params.collage??null)
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







Placed_student_router.delete(

    "/delete/:id/:old_logo",
    authenticateToken,
  

(req,res)=>{

        const result = new placed_students_controller().delete(req.params.id,req.params.old_logo)
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






module.exports= Placed_student_router 