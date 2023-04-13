let mysql = require('mysql');
let conn = mysql.createConnection({
    host:'localhost', user:'root',password:'raghav', database:'crud'
});
conn.connect(function(err){
    if(err) throw err;
    console.log('database connected');
});

module.exports= conn;