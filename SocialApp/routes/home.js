var ejs = require("ejs");
var session = require("express-session");
var mysql = require('./mysql');
var sign = false;
const saltRounds = 10;
//const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
	

function signin(req,res) {
		res.render('signin.ejs',function(err, result) {
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


function register(req,res) {
	res.render('register.ejs',function(err, result) {
// render on success
		if (!err) {
			res.end(result);
			
			console.log("inside register");
		}
// render or error
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
}


function afterSignIn(req,res)
	{
	console.log("inside the aftersignin");
	console.log("printing the email  "+req.param("username"));
	console.log("printing the pwd  "+req.param("password"));

		//console.log("printing email"+document.getElementById('email'));

		var getUser="select * from USERS where email='"+req.param("username")+"' and pwd = '"+req.param("password")+"' and isApproved = 'yes'";

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
					res.render('successLogin.ejs', {data: req.session.email},function(err, result) {
						// render on success
					if (!err) {
						res.end(result);
							sign = true;
							}
						// render or error
							else {
							res.end('An error occurred. Moderator need to approve your request');
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


  exports.login = function(req,res) //redirect function to the homepage
  {
	  //console.log(req.session.username[0].username+ "checking the exports login");
	  
	  
	  
	  if(req.session.username && sign === true) //check whether session is valid
	  {
		  //console.log("cheking the validity inside login page"+ req.session.username[0].username);
		  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        
		  res.render("successLogin",{data: req.session.username});
	  }
	  else
	  {
		  res.render("signin");
	  }
  };


  
  exports.logout = function(req,res) //logout function
  {
	  sign = false;

	  //console.log(req.session.username[0].username+ "value of username before destroy");

      //res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

	  req.session.destroy(); //destroy session
	  req.session = null;
      //res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');



	  res.redirect("signin");
      //res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');

	};

















function getAllUsers(req,res)
		{
		var getAllUsers = "select * from product";
		console.log("Query is:"+getAllUsers);
		mysql.fetchData(function(err,results){
					if(err){
						throw err;
					}
					else
					{
						if(results.length > 0){
							var rows = results;
							var jsonString = JSON.stringify(results);
							var jsonParse = JSON.parse(jsonString);
							console.log("Results Type: "+(typeof results));
							console.log("Result Element Type:"+(typeof rows[0].p_name));
							console.log("Results Stringify Type:"+(typeof jsonString));
							console.log("Results Parse Type:"+(typeof jsonString));
							console.log("Results: "+(results));
							console.log("Result Element:"+(rows[0].p_name));
							console.log("Results Stringify:"+(jsonString));
							console.log("Results Parse:"+(jsonParse));
							res.render('products.ejs',{data:jsonParse},function(err, result) {
 // render on success
								if (!err) {
									res.end(result);
								}
 // render or error
								else {
									res.end('An error occurred');
									console.log(err);
								}
							});
						}
						else { 
							console.log("No users found in database");
							ejs.renderFile('./views/failLogin.ejs',function(err, result) {
 // render on success
								if (!err) {
									res.end(result);	
								}
 // render or error
								else {
									res.end('An error occurred');
									console.log(err);
								}
							});
						}
					}
			},getAllUsers);
		
		
		}
		
		
function registeruser(req,res)
{
console.log("inside the register user");
console.log("firstname"+req.param("firstname"));
console.log("lastname"+req.param("lastname"));
console.log("pwd"+req.param("pwd"));
console.log("email"+req.param("email"));
console.log("role"+req.param("role"));






var pass = req.param("pwd");





var insert="insert into USERS (email,pwd,firstname,lastname,role,community,address,isApproved) values ('"+req.param("email")+"',  '"+req.param("pwd")+"' , '"+req.param("firstname")+"' , '"+req.param("lastname")+"', '"+req.param("role")+"', '"+req.param("community")+"', '"+req.param("address")+"','no')";
mysql.fetchData(function(err,results){
	if(err){
		throw err;
	}
	else{
	
			console.log("Inserted into mysql successfully");
			res.render('signin', function(err, result) {
					// render on success
				if (!err) {
					res.end(result);
						
						}
					// render or error
						else {
						res.end('An error occurred');
						console.log(err);
					}
				});
			}
				
		
	},insert);
}



exports.buy = function (req, res) {

	var entry = console.log(req.session.username[0].username+ "  Inside the buy function");
	
	var insert = "select * from product where username <> '"+req.session.username[0].username+"'";

	console.log("QUERY for submitting an AD is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the buy");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("receving the result of all products");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				console.log(JSON.stringify(json_responses));
				
			} 
			else {
				
				console.log("AD Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insert);
}






exports.sell = function (req, res) {

	var entry = console.log(req.session.username[0].username);
	
	
	var insert="select * from users";

	console.log("ad submisssion:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the query");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("submitted as successfully. Check the DB"+results);
				json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				
			} 
			else {
				
				console.log("ad inserted baby");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				
			}
		}
	}, insert);
	
	//res.render("successLogin.ejs");
}




//adding data to the cart

exports.addToCart = function (req, res) {

	var entry = console.log(req.session.username[0].username);
	var p_id = req.param("p_id");
	console.log(p_id + "captured the pid correctly inside the addToCart");
	
	
	var insert="insert into cart (user_id,p_id) values ('"+req.session.username[0].username+"',  '"+req.param("p_id")+"' )";

	console.log("QUERY for submitting an AD is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the addToCart");

		if (err) {
			throw err;
		} 
		else{
			if (results.length < 0) {
				
				console.log("submitted as successfully. Check the DB");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
				
			} 
			else {
				
				console.log("data inserted into cart");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insert);
}


exports.cart = function (req, res) {


	var insert = "select * from USERS where isApproved != 'yes' and role = 'user'";
	
    console.log("QUERY for checking the cart is :" + insert);

	//console.log("query output in cart is " + results);
	
	mysql.fetchData(function(err, results) {
		
		console.log("inside the buy");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				
				console.log("printing the result of cart values " + results);
				console.log("receving the result of all products");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				console.log(JSON.stringify(json_responses));
				
			} 
			else {
				
				console.log("AD Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insert);
}


//inserting into purchase

exports.purchase = function (req, res) {

	console.log("In am inside the approving the user");
	console.log("****APPROVING USER*****")
	var email = req.param("email");
	var insert = "update USERS set isApproved = 'yes' where email = '"+req.param("email")+"' ";



	console.log("QUERY for submitting an AD is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the inserting into purchase");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("Inserted into products");
				json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				
			} 
			else {
				
				console.log("Error while insering into cart");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				
			}
		}
	}, insert)

}


//code to show the hstory of purchase


exports.history = function (req, res) {

	var entry = console.log(req.session.username[0].username+ "  Inside the buy function");
	

	var insert = "select * from purchase2 where myname = '"+req.session.username[0].username+"'";
	console.log("QUERY for submitting an AD is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the buy");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("receving the result of all products");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				console.log(JSON.stringify(json_responses));
				
			} 
			else {
				
				console.log("AD Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insert);
}



exports.yourads = function (req, res) {

	var entry = console.log(req.session.username[0].username+ "  Inside the buy function");
	

	var insert = "select p_id,p_name,p_quantity,p_price,p_disc from product where username = '"+req.session.username[0].username+"' UNION select p_id,p_name,p_quantity,p_price,p_disc from purchase2 where username = '"+req.session.username[0].username+"'";
	console.log("QUERY for submitting an AD is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the buy");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("receving the result of all products");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				console.log(JSON.stringify(json_responses));
				
			} 
			else {
				
				console.log("AD Inserted");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, insert);
}


//updating users information

exports.info = function (req, res) {

	console.log(req.session.username[0].username+ "INSIDE INFO");
	console.log(req.param("Birthday"));
	
	var insert="update users set about = '"+req.param("about")+"', Birthday = '"+req.param("Birthday")+"', Ebay_handle= '"+req.param("Ebay_handle")+"', Address= '"+req.param("Address")+"',Contact = '"+req.param("Contact")+"' where username = '"+req.session.username[0].username+"'";

	
	var show = "select * from users where username = '"+req.session.username[0].username+"'";
	
	console.log("user updation query is:" + insert);

	mysql.fetchData(function(err, results) {
		
		console.log("inside the info");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("submitted as successfully. Check the DB");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				
			} 
			else {
				
				console.log("Successfully updated the information about the user");
				json_responses = {"statusCode" : 200};
				//res.send(json_responses);
				
			}
		}
	}, insert);
	
	
	mysql.fetchData(function(err, results) {
		
		console.log("inside the info");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("submitted as successfully. Check the DB");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				
			} 
			else {
				
				console.log("Successfully updated the information about the user");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, show);
	
	
	
	
	


};


exports.info1 = function (req, res) {

	console.log(req.session.email[0].email+ "INSIDE INFO");
	//console.log(req.param("Birthday"));
	
	//var insert="update users set about = '"+req.param("about")+"', Birthday = '"+req.param("Birthday")+"', Ebay_handle= '"+req.param("Ebay_handle")+"', Address= '"+req.param("Address")+"',Contact = '"+req.param("Contact")+"' where username = '"+req.session.username[0].username+"'";

	
	var show = "select * from USERS";
	
	console.log("selecting all the users and sending:" + show);


	
	
	mysql.fetchData(function(err, results) {
		
		console.log("inside selecting all users");

		if (err) {
			throw err;
		} 
		else{
			if (results.length > 0) {
				
				console.log("submitted as successfully. Check the DB");
				json_responses = {"statusCode" : 200 , "results" : results };
				res.send(json_responses);
				
			} 
			else {
				
				console.log("Successfully updated the information about the user");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		}
	}, show);


}


exports.register = register;
exports.registeruser = registeruser;
exports.signin=signin;
exports.afterSignIn=afterSignIn;
exports.getAllUsers=getAllUsers;
