const express = require('express');
const PORT = 9045;
const app = express();
const cors = require('cors');

let corsOptions = {
    origin: ['http://localhost:3000', 'https://navneet-aneja-dev.netlify.app', 'https://navneet-aneja.netlify.app']
}

app.use(cors(corsOptions));

app.get("/", function(req,res){
    return res.send("hello");
})

app.listen(process.env.PORT || PORT, function(err){
    if(err){
        console.log("Error in starting server", err);
        return;
    }
    return console.log("server started", PORT);
})