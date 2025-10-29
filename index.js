
const express  = require ("express")
const cors = require("cors")
const mongoose =require ("mongoose");
// const morgan =require ("morgan");


const college_router = require("./routers/College_router");
const course_router = require("./routers/Course_router");
const hiring_partenrs_router = require("./routers/Hiring_partners_router");
const scholarship_router = require("./routers/Scholarship_router");
const doubts_router = require("./routers/Doubts_router");
const post_router = require("./routers/Post_router");
const placement_router = require("./routers/Placement_router");
const rating_router = require("./routers/Rating_router");
const review_router = require("./routers/Review_router");
const banner_router = require("./routers/Banner_router");
const story_router = require("./routers/Story_router");
const course_rating_router = require("./routers/Course_rating_router");
const faculty_router = require("./routers/Faculty_router");
const agent_router = require("./routers/Agent_router");
const Placed_student_router = require("./routers/Placed_students_router");
const admin_routers = require("./routers/Admin_router");
const User_routers = require("./routers/User_router");
const otp_router = require("./routers/Otp_router");
const stream_router = require("./routers/Stream_router");
const slider_banner_router = require("./routers/Slider_banner_router");

const event_router = require("./routers/Event_router");
const comment_router = require("./routers/Comment_router");
const placementScore_router = require("./routers/PlacementScore_router");
const website_blogs_router = require("./routers/Website_blog_router");
const website_news_router = require("./routers/Website_news_router");
const websitestory_router = require("./routers/Website_stories_router");
const CollageCourseRouter = require("./routers/CollageCourseRouter");

// nitesh make routes 
const course_filter_router = require("./routers/CourseFilter_router");



const app = express();

// app.use(morgan);
app.use(express.json());


app.use(express.static("public"))


require('dotenv').config()

const morgan = require("morgan");

const ExamRouter = require("./routers/ExamRouter");
const AgenciesCollageRatingRouter = require("./routers/AgenciesCollageRatingRouter");
const PremiumAdRouter = require("./routers/PremiumAdsRouter");
app.use(morgan("dev"));


app.use(
  cors({
    origin: ["https://collage-world-frontend-s6vn.vercel.app"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});


app.use("/college",college_router)

app.use("/course", course_router);
app.use("/collage_course", CollageCourseRouter);
app.use("/hiring_partners", hiring_partenrs_router);
app.use("/scholarship", scholarship_router);
app.use("/doubts", doubts_router);
app.use("/post", post_router);

app.use("/placement", placement_router);
app.use("/rating", rating_router);
app.use("/review", review_router);
app.use("/banner", banner_router);
app.use("/story", story_router);
app.use("/course_rating", course_rating_router);
app.use("/faculty", faculty_router);
app.use("/agent", agent_router);
app.use("/placed_students", Placed_student_router);
app.use("/admin", admin_routers);
app.use("/user", User_routers);
app.use("/otp", otp_router);

app.use("/stream", stream_router);

app.use("/slider_banner", slider_banner_router);
app.use("/event", event_router);
app.use("/comment", comment_router);
app.use("/placement_score", placementScore_router);
app.use("/website_blog",website_blogs_router)
app.use("/website_news",website_news_router)
app.use("/website_story",websitestory_router)
app.use("/exam",ExamRouter)
app.use("/agencies",AgenciesCollageRatingRouter)
app.use("/premiumad",PremiumAdRouter)


// nitesh make routes 
app.use("/course_filter",course_filter_router)

mongoose.connect(
    process.env.MONGODB_URL,
    {dbName:process.env.DB_NAME}
)

.then(

    ()=>{
        console.log("db conected")

        app.listen( process.env.PORT,()=>{
            
            console.log("server started")
        })

    }

)

.catch(
    
    (error)=>{

        console.log(error);
        
        

        console.log("db not conected ")
       

    }
)
