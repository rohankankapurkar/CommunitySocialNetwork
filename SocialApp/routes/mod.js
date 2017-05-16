/**
 * Created by rohankankapurkar on 5/14/17.
 */

var session = require("express-session");
var mysql = require('./mysql');


function signInMod(req,res) {
    res.render('signInMod.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("inside signin");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}

function signInAdmin(req,res) {
    res.render('signInAdmin.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
            console.log("inside signin");
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}



function afterSignInMod(req,res)
{
    console.log("****Moderator logged in****");
    console.log("printing the email  "+req.param("username"));
    console.log("printing the pwd  "+req.param("password"));

    //console.log("printing email"+document.getElementById('email'));

    var getUser="select * from USERS where email='"+req.param("username")+"' and pwd = '"+req.param("password")+"' and role = 'moderator' and isApproved = 'yes'";

    console.log("printing login query"+getUser);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else{
            if(results.length > 0){

                console.log("valid Login");
                console.log("result is" + results[0].email);
                var json_response = { "statusCode" : 200};
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

                console.log("true. Encryption works ");
                req.session.email = results;
                req.session.id=results[0].email;
                res.render('successLogin2.ejs', {data: req.session.email},function(err, result) {
                    // render on success
                    if (!err) {
                        res.end(result);
                        sign = true;
                    }
                    // render or error
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });



                console.log (JSON.stringify(results));



            }
            else {
                console.log("Invalid Login");
                res.render('failLogin.ejs',function(err, result) {
                    // render on success
                    if (!err) {
                        res.end(result);
                    }
                    // 	render or error
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });
            }
        }
    },getUser);
}


function afterSignInAdmin(req,res)
{
    console.log("****Admin logged in****");
    console.log("printing the email  "+req.param("username"));
    console.log("printing the pwd  "+req.param("password"));

    //console.log("printing email"+document.getElementById('email'));

    var getUser="select * from USERS where email='"+req.param("username")+"' and pwd = '"+req.param("password")+"' and role = 'administrator'";

    console.log("printing login query"+getUser);

    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else{
            if(results.length > 0){

                console.log("valid Login");
                console.log("result is" + results[0].email);
                var json_response = { "statusCode" : 200};
                res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

                console.log("true. Encryption works ");
                req.session.email = results;
                req.session.id=results[0].email;
                res.render('successLogin3.ejs', {data: req.session.email},function(err, result) {
                    // render on success
                    if (!err) {
                        res.end(result);
                        sign = true;
                    }
                    // render or error
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });



                console.log (JSON.stringify(results));



            }
            else {
                console.log("Invalid Login");
                res.render('failLogin.ejs',function(err, result) {
                    // render on success
                    if (!err) {
                        res.end(result);
                    }
                    // 	render or error
                    else {
                        res.end('An error occurred');
                        console.log(err);
                    }
                });
            }
        }
    },getUser);
}


exports.signInMod=signInMod;
exports.afterSignInMod = afterSignInMod;
exports.signInAdmin=signInAdmin;
exports.afterSignInAdmin = afterSignInAdmin;



