const express = require('express');
const path = require('path');

const fs = require('fs');
const port = 4444;

const app = express();


app.get("/", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/index.html"));
})


app.get("/style.css", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/style.css"));
})       

app.get("/cipok", (req, res) =>{
    res.sendFile( path.join(__dirname, "./data/cipok.json"));
})         
        
app.get("/cipo.js", (req, res) =>{
    res.sendFile( path.join(__dirname, "./public/cipo.js"));
}) 
       
app.post("/cipok", (req, res) =>{
    let data = '';
    req.on('data', (chunk) => {
        data += chunk.toString();
    });
    req.on('end', () => {
        const ujCipo = JSON.parse(data);



        fs.readFile('./data/cipok.json', (err, data) => {
            let datas = JSON.parse(data);
            datas.push({
                "marka": ujCipo.marka,
                "nem": ujCipo.nem,
                "meret": ujCipo.meret,
                "ar": ujCipo.ar,
            });
            fs.writeFile('./data/cipok.json', JSON.stringify(datas), () => {
                res.end(JSON.stringify(datas));
            })
        })
    })
})

       
            

app.get("/", (req, res) => {
    res.redirect("/");
})           

app.listen(port);


