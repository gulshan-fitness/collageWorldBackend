
const fileUpload = require("express-fileupload")
const course_controller = require("../Controlers/Course_controller")
const authenticateToken = require("../Authentication")

express = require("express")


const course_router = express.Router()




course_router.post(

    "/add",

    fileUpload(
        {
            createParentPath:true
        }
     ),
     authenticateToken,

(req,res)=>{

        const result = new course_controller().add(req.body,req.files.course_image,
            req.files?.ProgramOverview_image??null,
            req.files?.keyhighlight_image??null,
            req.files?.syllabusImage??null,
            req.files?.eligibility_DurationImage??null,
            req.files?.programFeesImage??null,
            req.files?.admissionProcessImage??null,
            req.files?.educationLoanImage??null
            )
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

    "/read/:id?",
   
  

(req,res)=>{

        const result = new course_controller().read(req.params.id??null,req.query??null)
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

        const result = new course_controller().read_top_10_course()
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

        const result = new course_controller().top10course_by_city(req.params.city)
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

        const result = new course_controller().top10course_by_state(req.params.state)
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

        const result = new course_controller().edit(req.params.id,req.body)
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


course_router.patch(

    "/ImageEdits/:id/:mode/:path",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new course_controller().imageEdit(req.params.id, req.params.mode, req.body, req.files.image,req.params.path,)
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


course_router.patch(

    "/Perticuler_ImageDelete/:id/:old_image/:path/",
    fileUpload(
        {
            createParentPath:true
        }
     ),

     authenticateToken,

(req,res)=>{

        const result = new course_controller().Perticuler_ImageDelete(req.params.id, req.params.old_image, req.params.path)
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

    "/delete/:id/:course_image/:programOverview_image/:keyhighlight_image/:syllabusImage/:eligibility_DurationImage/:programFeesImage/:admissionProcessImage/:educationLoanImage",

    authenticateToken,  

(req,res)=>{

        const result = new course_controller().delete(req.params.id,req.params.course_image,req.params.programOverview_image,req.params.keyhighlight_image,req.params.syllabusImage,req.params.eligibility_DurationImage,req.params.programFeesImage,req.params.admissionProcessImage,req.params.educationLoanImage)
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