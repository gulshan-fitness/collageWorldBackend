
const fileUpload = require("express-fileupload")
const CollageCourse_controller = require("../Controlers/CollageCourseController")
const authenticateToken = require("../Authentication")

express = require("express")


const course_router = express.Router()




course_router.post(

    "/add",

     authenticateToken,

(req,res)=>{

        const result = new CollageCourse_controller().add(req.body)
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


course_router.get(

    "/read/:id?/:collage_id?",
   
  

(req,res)=>{

        const result = new CollageCourse_controller().read(req.params.id??null,req.params.collage_id??null ,req.query??null)
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


course_router.get(

    "/read_top10course",
    
(req,res)=>{

        const result = new CollageCourse_controller().read_top_10_course()
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

course_router.get(

    "/top10course_by_city/:city",
    
(req,res)=>{

        const result = new CollageCourse_controller().top10course_by_city(req.params.city)
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

course_router.get(

    "/top10course_by_state/:state",
    
(req,res)=>{

        const result = new CollageCourse_controller().top10course_by_state(req.params.state)
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




course_router.put(
    "/edit/:id",
    authenticateToken,
  

(req,res)=>{

        const result = new CollageCourse_controller().edit(req.params.id,req.body)
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




course_router.delete(

    "/delete/:id",

    authenticateToken,  

(req,res)=>{

        const result = new CollageCourse_controller().delete(req.params.id)
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






module.exports= course_router 