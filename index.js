const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
// node index.js: run
// Ctrl+c: abort

app.listen(PORT,function () {
    console.log("server is running...");
});
app.use(express.static("public")); //declare css
app.set("view engine","ejs");
// su dung ejs lam view engine

var counter = 0;
app.get("/",function (req,res) {
    counter++;
    let city = req.query.cityname;
    if(city == undefined){
        city = "Hanoi,vietnam";
    }
    res.render("home",{
        counter: counter,
        city:city
    });
})

app.get("/about-us",function (req,res) {
    res.send("Introduction about us...");  //res:request
});
const fs = require("fs"); //fs: file system: du lieu file
app.get("/danh-sach-thanh-pho",function (req,res) {
    let data = fs.readFileSync("thanhpho.json","utf8")
    let cities = JSON.parse(data);
    res.render("cities",{
        cities:cities
    })
})

app.get("/thanh-pho/:id",function (req,res) {
    let cityId = req.params.id;
    let city = {};
    let data = fs.readFileSync("thanhpho.json","utf-8");
    let cities = JSON.parse(data);
    cities.map(function (e) {
        if(e.id == cityId){
            city = e;
        }
    });
    res.render("city",{
        city:city
    });
});
app.get("/api/messages",function (req,res) {
    let data = [
        {
            msg: "Hello",
            name: "Luna"
        },
        {
            msg: "Hi",
            name: "Long"
        },
        {
            msg: "Di choi ko?",
            name: "Luna"
        }
    ];
    let rs = {
        status: true,
        message: "Success",
        data: data
    };
    res.send(rs);
});

app.get("/danhsachsanpham",function (req,res) {
    let data = fs.readFileSync("danhsachsanpham.json","utf8")
    let cities = JSON.parse(data);
    res.render("cities",{
        cities:cities
    })
})

app.get("/sanpham/:id",function (req,res) {
    let cityId = req.params.id;
    let city = {};
    let data = fs.readFileSync("danhsachsanpham.json","utf-8");
    let cities = JSON.parse(data);
    cities.map(function (e) {
        if(e.id == cityId){
            city = e;
        }
    });
    res.render("city",{
        city:city
    });
})
//npm install ejs --save
//npm install express --save
//url: ?cityname=city,country