package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

type NewPerson struct {
    ID uint `json:"id"`
    FirstName string `json:"firstname"`
    LastName string `json:"lastname"`
    Username string `json:"username"`
    Password string `json:"password"`
    SportsScore string `json:"sportsscore"`
    MoviesScore string `json:"moviesscore"`
    GKScore string `json:"gkscore"`
    TotalScore string `json:"totalscore"`
}

type Question struct {
    ID uint `json:"id"`
    QName string `json:"qname"`
    Opt1 string `json:"opt1"`
    Opt2 string `json:"opt2"`
    Opt3 string `json:"opt3"`
    Opt4 string `json:"opt4"`
    Ans1 bool `json:"ans1"`
    Ans2 bool `json:"ans2"`
    Ans3 bool `json:"ans3"`
    Ans4 bool `json:"ans4"`
    QID string `json:"qid"`
    Category string `json:"category"`
}

type UserQuiz struct {
    ID uint `json:"id"`
    Username string `json:"username"`
    Category string `json:"category"`
    Quizno string `json:"quizno"`
    Score string `json:"score"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()

   db.AutoMigrate(&NewPerson{})
   db.AutoMigrate(&Question{})
   db.AutoMigrate(&UserQuiz{})
   r := gin.Default()
   r.GET("/people/", GetPeople)                             // Creating routes for each functionality
   r.GET("/people/:uname", GetPerson)
   r.GET("/peopl/:fname/:lname", GetPersons)
   r.POST("/people", CreatePerson)
   r.PUT("/people/:id", UpdatePerson)
   r.DELETE("/people/:id", DeletePerson)
   r.GET("/que/", GetQuestion)
   r.GET("/oneque/:id",GetoneQue)
   r.PUT("/que/:id",UpdateQue)
   r.POST("/que", CreateQuestion)
   r.GET("/cat/:category/:id", GetQuestions)
   r.DELETE("/que/:id",DeleteQuestion)
   r.DELETE("/quiz/:cat/:qid",DeleteQuiz)
   r.GET("/userquiz/:uname/:cat/:qid",Getdetail)
   r.GET("/userquiz/:uname",Getuserdetail)
   r.POST("/userquiz",Adddetail)
   r.Use((cors.Default()))
   r.Run(":8080")                                           // Run on port 8080
}


func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person NewPerson
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")          //figure out
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
   var person NewPerson
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func CreatePerson(c *gin.Context) {
   var person NewPerson
   c.BindJSON(&person)
   db.Create(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func GetPerson(c *gin.Context) {
   uname := c.Params.ByName("uname")
//    fmt.Println(uname)
   var person NewPerson
   if err := db.Where("username = ?", uname).First(&person).Error; err != nil {
    //   c.AbortWithStatus(404)
      fmt.Println(err)
   }
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200, person)
}

func GetPersons(c *gin.Context) {
    fname := c.Params.ByName("fname")
    lname := c.Params.ByName("lname")
 //    fmt.Println(uname)
    var person NewPerson
    if err := db.Where("first_name = ? AND last_name = ?", fname,lname).Find(&person).Error; err != nil {
     //   c.AbortWithStatus(404)
       fmt.Println(err)
    }
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, person)
 }

func GetPeople(c *gin.Context) {
   var people []NewPerson
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, people)
   }
}

func CreateQuestion(c *gin.Context) {
    var question Question
    c.BindJSON(&question)
    db.Create(&question)
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200, question)
 }

func GetQuestion(c *gin.Context) {
    var question []Question
    if err := db.Find(&question).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    }else {
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200, question)
    }
}

func DeleteQuestion(c *gin.Context) {
    id := c.Params.ByName("id")
    var question Question
    d := db.Where("id = ?", id).Delete(&question)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")          //figure out
    c.JSON(200, gin.H{"id #" + id: "deleted"})
 }

 func DeleteQuiz(c *gin.Context) {
    qid := c.Params.ByName("qid")
    cat := c.Params.ByName("cat")
    var question Question
    d := db.Where("q_id = ? AND category = ?", qid, cat).Delete(&question)
    fmt.Println(d)
    c.Header("access-control-allow-origin", "*")          //figure out
    c.JSON(200, gin.H{"id #" + qid: "deleted"})
 }

 func GetQuestions(c *gin.Context) {
    category := c.Params.ByName("category")
    id := c.Params.ByName("id")
    fmt.Println(category)
    fmt.Println(id)
    var question []Question
    if err := db.Where("category = ? AND q_id = ?", category,id).Find(&question).Error; err != nil {
     //   c.AbortWithStatus(404)
       fmt.Println(err)
    }
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    fmt.Println(question)
    c.JSON(200, question)
 }

 func GetoneQue(c *gin.Context) {
    id := c.Params.ByName("id")
    var question Question
    if err := db.Where("id = ?",id).Find(&question).Error; err != nil {
     //   c.AbortWithStatus(404)
       fmt.Println(err)
    }
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    // fmt.Println(question)
    c.JSON(200, question)
 }

 func UpdateQue(c *gin.Context) {
    var question Question
    id := c.Params.ByName("id")
    if err := db.Where("id = ?", id).First(&question).Error; err != nil {
       c.AbortWithStatus(404)
       fmt.Println(err)
    }
    c.BindJSON(&question)
    db.Save(&question)
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200, question)
 }

 func Getdetail(c *gin.Context) {
     uname := c.Params.ByName("uname")
     qid := c.Params.ByName("qid")
     cat := c.Params.ByName("cat")

     var UQ UserQuiz
     if err := db.Where("username = ? AND category = ? AND quizno = ?", uname,cat,qid).Find(&UQ).Error; err != nil {
        //   c.AbortWithStatus(404)
          fmt.Println(err)
       }
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200, UQ)
 }

 func Getuserdetail(c *gin.Context) {
    uname := c.Params.ByName("uname")

    var UQ []UserQuiz
    if err := db.Where("username = ?", uname).Find(&UQ).Error; err != nil {
       //   c.AbortWithStatus(404)
         fmt.Println(err)
      }
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, UQ)
}

 func Adddetail(c *gin.Context) {
    var UQ UserQuiz
    c.BindJSON(&UQ)
    db.Create(&UQ)
    c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
    c.JSON(200, UQ)
 }