const express = require('express');
const app = express();

const PORT = 5000;

const problemsRoute = require("./routes/problems");



//middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//console.log(problemsRoute);
app.use("/api/v1/problems",problemsRoute);

app.get("/",(req,res) => {
    
    res.send("welcome to upsolver tracker");
});






app.listen(PORT, () => {
    console.log("listening on port ",PORT,"...");
})