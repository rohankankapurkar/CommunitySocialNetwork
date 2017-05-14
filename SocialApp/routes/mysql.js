var ejs= require('ejs');//importing module ejs
var mysql = require('mysql');//importing module mysql
function getConnection(){
	var connection = mysql.createConnection({
		host : 'csnet.cn9igngmescf.us-west-1.rds.amazonaws.com', //host where mysql server is running
		user : 'rohan', //user for the mysql application
		password : 'kankapurkar', //password for the mysql application
		database : 'cmpe281', //database name
		port : 3306 //port, it is 3306 by default for mysql
	});
	return connection;
}
//fetching the data from the sql server
function fetchData(callback,sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	var connection=getConnection();
	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else
		{ // return err or result
			console.log("DB Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
	connection.end();
}
exports.fetchData=fetchData;





/////
/*
 var ejs = require('ejs');
 var mysql = require('mysql');
 var c = 50;

 var stack = [];
 var q = [];


 var pool = function(c){
 var conn;

 for(var count=0; count < c; count++){
 conn = mysql.createConnection({
 host : 'localhost',
 user : 'root',
 password : 'SonyVaio',
 database : 'test',
 port : 3306
 });
 stack.push(conn);

 }
 }

 var getConnection = function(callback){

 if(stack.length > 0){
 connection = stack.pop();
 callback(null, connection);
 }
 else{
 q.push(callback);
 }

 }

 setInterval(function(){
 if(stack.length > 0){
 if(q.length > 0){
 callback = q.shift();
 connection = stack.pop();
 callback(null, connection);
 }
 }
 }, 5000)

 pool(c);

 exports.fetchData = function(callback, sqlQuery ) {
 getConnection(function(err, connection) {
 connection.query(sqlQuery, function(err, result) {
 if (err) {
 //console.log("ERROR: " + err.message);
 throw (err);
 }
 if (result) {
 connection.releaseConnection;
 stack.push(connection);
 callback(err, result);
 }
 });
 });
 }*/
