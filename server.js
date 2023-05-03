const app = require("./src/app.js")


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



app.listen(3001)