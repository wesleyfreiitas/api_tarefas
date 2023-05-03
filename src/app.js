const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const taskRoutes = require("./routes/tasks")

app.get("/", (req, res) => {
    res.status(200).send({"message":"API Works!!!"})
})

app.use("/tasks", taskRoutes)

module.exports = app