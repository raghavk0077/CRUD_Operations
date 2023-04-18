let express = require('express');
const app = express();

var path = require('path');
// app.use(express.urlencoded({extended:false}));
app.set('views', path.join(__dirname,'view'));
app.set('view engine', 'ejs');




const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

// 
let db = require('./database');

let msg = "";
app.get('/',function(req,res){
    let msg = "";
    if(req.query['msg'] != ""){
        msg = req.query['msg'];
    }
    res.render('menu', {msg:msg});
})

app.get('/adduser', function(req,res){
    res.render('adduser');
})

app.get('/listuser', function(req,res){
    let msg = "";
    if(req.query['msg'] != ""){
        msg = req.query['msg'];
    }
    let sql__list = "select * from users;"
    db.query(sql__list, function(error, result, field){
        if(error){
            res.redirect('/');
        }
        else{
            res.render('userlistview', {data:result, msg:msg});
        }
    })
})

app.post('/addusersubmit', function(req,res){
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let address = req.body.address;
    let mobile = req.body.mobile;
    let dob = req.body.dob;
    let gender = req.body.gender;


    let msg="";


    let sql = "insert into users (name, email, pass, address, mobile, dob, gender) values ('"+name+"','"+email+"','"+password+"','"+address+"','"+mobile+"','"+dob+"','"+gender+"');";    
    db.query(sql, function(error, result, field){
        if(error)
            msg = "user not added";
        else
            msg = "user added successfully";
            res.redirect('/?msg='+msg);
    });
  
});

// edit user
app.get('/edituser', function(req,res){
    let sql = "select* from users where id = "+req.query['id'];
    db.query(sql, function(error, result, field){
        if(error)
            res.redirect('/');
        else
            res.render('edituser', {data:result});
    })
})

app.post('/editusersubmit', function(req, res){
    var id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let address = req.body.address;
    let mobile = req.body.mobile;

    let sql__edit = "update users set name ='"+name+"', email ='"+email+"', address ='"+address+"', mobile = "+mobile+" where id ="+id;
    db.query(sql__edit, function(error, result, field){
        if(error){
            res.redirect('/listuser?msg=can not update user');
            console.log(error);
        }
        else{
            res.redirect('/listuser?msg=user updated');
        }
    })
})

//delete user
app.get('/deluser', function(req,res){
    let sql__del = "Delete from users where id = "+req.query['id'];
    db.query(sql__del, function(error, result, field){
        if(error)
            res.redirect('/listuser?msg=unable to delete user');
        else
            res.redirect('/listuser?msg=User Deleted');
    })
})

app.listen(3000,function(){
    console.log("Server started");
})