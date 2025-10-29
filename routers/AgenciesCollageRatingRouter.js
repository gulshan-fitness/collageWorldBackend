

const AgenciesCollageRatingcontroller = require("../Controlers/AgenciesCollageRatingController")
const authenticateToken = require("../Authentication")

express = require("express")


const AgenciesCollageRatingRouter = express.Router()




AgenciesCollageRatingRouter.post(

    "/add",

 
     authenticateToken,

(req,res)=>{

        const result = new AgenciesCollageRatingcontroller().add(req.body
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


AgenciesCollageRatingRouter.get(
    "/read/:agencyname?",
(req,res)=>{
        const result = new AgenciesCollageRatingcontroller().read(
            req.params.agencyname??null
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


// AgenciesCollageRatingRouter.get(

//     "/read_top10course",
    
// (req,res)=>{

//         const result = new AgenciesCollageRatingcontroller().read_top_10_course()
//         result.then(
//             (succes)=>{
//                 res.send( succes)
//             }
//         )
        
//         .catch(
//             (error)=>{
//                 res.send( error) 
//             }
//         )

//     }
// )

// AgenciesCollageRatingRouter.get(

//     "/top10course_by_city/:city",
    
// (req,res)=>{

//         const result = new AgenciesCollageRatingcontroller().top10course_by_city(req.params.city)
//         result.then(
//             (succes)=>{
//                 res.send( succes)
//             }
//         )
        
//         .catch(
//             (error)=>{
//                 res.send( error) 
//             }
//         )

//     }
// )

// AgenciesCollageRatingRouter.get(

//     "/top10course_by_state/:state",
    
// (req,res)=>{

//         const result = new AgenciesCollageRatingcontroller().top10course_by_state(req.params.state)
//         result.then(
//             (succes)=>{
//                 res.send( succes)
//             }
//         )
        
//         .catch(
//             (error)=>{
//                 res.send( error) 
//             }
//         )

//     }
// )




AgenciesCollageRatingRouter.put(

    "/edit/:id",
    authenticateToken,
  

(req,res)=>{

        const result = new AgenciesCollageRatingcontroller().edit(req.params.id,req.body)
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


// AgenciesCollageRatingRouter.patch(

//     "/ImageEdits/:id/:mode/:path",
//     fileUpload(
//         {
//             createParentPath:true
//         }
//      ),

//      authenticateToken,

// (req,res)=>{

//         const result = new AgenciesCollageRatingcontroller().imageEdit(req.params.id, req.params.mode, req.body, req.files.image,req.params.path,)
//         result.then(
//             (succes)=>{
//                 res.send( succes)
//             }
//         )
        
//         .catch(
//             (error)=>{
//                 res.send( error) 
//             }
//         )

//     }
// )


// AgenciesCollageRatingRouter.patch(

//     "/Perticuler_ImageDelete/:id/:old_image/:path/",
//     fileUpload(
//         {
//             createParentPath:true
//         }
//      ),

//      authenticateToken,

// (req,res)=>{

//         const result = new AgenciesCollageRatingcontroller().Perticuler_ImageDelete(req.params.id, req.params.old_image, req.params.path)
//         result.then(
//             (succes)=>{
//                 res.send( succes)
//             }
//         )
        
//         .catch(
//             (error)=>{
//                 res.send( error) 
//             }
//         )

//     }
// )





  





AgenciesCollageRatingRouter.delete(

    "/delete/:id",

    authenticateToken,  

(req,res)=>{

        const result = new AgenciesCollageRatingcontroller().delete(req.params.id)
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






module.exports= AgenciesCollageRatingRouter 