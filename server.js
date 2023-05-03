const path = require("path")
const express = require("express")
const tasks = require("./data/tasks.json")

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// app.get("/", (req, res) => {
//     res.send("Olá mundo!!!")
// })

//o servidor estatico para a rota "/"
// app.use(express.static("static"))

// app.use("/images", express.static(path.join(__dirname,"images")))

// app.get("*", (req, res)=>{
//     //Se for aceito o formato html
//     if(req.accepts("html")){
//         res.status(404).sendFile(path.join(__dirname, "404.html"))
//     }
// })
app.get("/tasks", (req, res) => {
    res.send(tasks)
})

app.post("/tasks", (req, res) => {
    // res.send({
    //     success: true,
    //     message: "task adicionada"
    // })
    // console.log(req.body)
    const {
        title,
        userId
    } = req.body

    const newTask = {
        "title": title,
        "completed": false,
        "createdAt": Date.now,
        "updatedAt": null,
        "userId": userId,
        "id": tasks[tasks.length - 1].id + 1

    }

    tasks.push(newTask)
    res.send(newTask)
})

app.get("/tasks/:id", (req, res)=>{
    res.send(tasks.filter(task => task.id === parseInt(req.params.id)))
})
app.put("/tasks/:id", (req, res)=>{
    const {title, completed, createdAt, updatedAt, id, userId} = req.body
    const newTask = {title, completed, createdAt, updatedAt, id, userId}

    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))

    tasks.splice(taskIndex,1,newTask)

    res.send(newTask)
})
app.patch("/tasks/:id", (req, res)=>{
    const {title, completed, userId} = req.body
    
    const taskById = tasks.filter(task=>task.id === parseInt(req.params.id))[0]

    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))

    const updatedAt = Date.now()

    const taskUpdated = {title, completed, userId, updatedAt}

    for(let prop in taskUpdated){
        if(typeof taskUpdated[prop] === "undefined") delete taskUpdated[prop]
    }

    const newTask = {...taskById, ...taskUpdated}

    tasks.splice(taskIndex,1,newTask)

    res.send(newTask)
})
app.delete("/tasks/:id", (req, res)=>{
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id))
    const deleteTask = tasks.splice(taskIndex, 1)
    res.send(deleteTask)
})


app.listen(3001)