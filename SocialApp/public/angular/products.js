
var app = angular.module('myApp', [ 'ngRoute' ]);
app.config(function($routeProvider) {
	console.log("inside routeprovider");
		$routeProvider
		
		
		.when("/sell", {
			templateUrl : "templates/sell.html",
			
			
		})
		
		.when("/buy", {
			templateUrl : "templates/buy.ejs",
			
			
		})
		
		.when("/cart", {
			templateUrl : "templates/cart.ejs",
			
			
		})
		.when("/history", {
			templateUrl : "templates/history.ejs",
			
			
		})
		.when("/yourads", {
			templateUrl : "templates/yourads.ejs",
			
			
		})
		.when("/info", {
			templateUrl : "templates/info.ejs",
			
			
		});
	});



app.controller('sellController1', function($scope,$http) {
	console.log("I am in sell controller");
	console.log("here" +$scope.status);
	console.log("printing product name" + $scope.p_name);
	$scope.addproduct = function() {
		$http({
			method : "POST",
			url : '/sell',
			data : {
				"p_name" : $scope.p_name,
				"p_price" : $scope.p_price,
				"p_disc" : $scope.p_disc
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				console.log("sent the data over server succssfully.");
			
			}
			else
				{
				console.log("failed while sending data new product");
				}
				//Making a get call to the '/redirectToHomepage' API
		}).error(function(error) {
               console.log("failed inside products.js");
		});
	};
});








app.controller('buyController', function($scope,$http) {
	console.log("I am in buy controller");
	//console.log("here" +$scope.status);
	//console.log("printing product name" + $scope.p_name);
	
		$http({
			method : "POST",
			url : '/buy'
			
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data+ "oho");
			if (data.statusCode == 200) {
				console.log("data received successfully");
				$scope.allproducts = data.results;
				console.log("Result fetached is " + $scope.allproducts);
				console.log(JSON.stringify($scope.allproducts));
				
			
			}
			else
				{
				console.log("failed while sending data new product");
				}
				//Making a get call to the '/redirectToHomepage' API
		}).error(function(error) {
               console.log("failed inside products.js");
		});
		
		
		$scope.addToCart = function(data) {
			var p_id = {
				"p_id" : data
			};
			console.log(p_id);
			console.log(data);
			console.log("inside addCart function");
			$http({
				method : "POST",
				url : '/addToCart',
				data : p_id
			}).success(function(data) {

				if (data.statusCode == 200) {
					console.log("added to the cart successfully");
				} else {
					console.log("error while adding data to the cart");
				}
			})
		}
		
		
		

});



app.controller('cartController', function($scope,$http,$route) {
	console.log("I am in cart controller");

			$http({
			method : "POST",
			url : '/cart'
			
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data+ "oho");
			if (data.statusCode == 200) {
				console.log("data received successfully");
				$scope.allproducts = data.results;
				console.log("Result fetached is " + $scope.allproducts);
				console.log(JSON.stringify($scope.allproducts));
				
			
			}
			else
				{
				console.log("failed while sending data new product");
				}
		}).error(function(error) {
               console.log("failed inside products.js");
		});
		
		
		$scope.purchase = function(data) {
			var p_id = {
				"email" : data,

				
				
				};
			console.log("printing p_id object"+p_id);
			console.log(data);
			console.log("Printing the card number"+p_id.card);
			console.log("inside purchase function");
			
			
			//credit card validation code
			
			

			$http({
				method : "POST",
				url : '/purchase',
				data : p_id
			}).success(function(data) {

				if (data.statusCode == 200) {
					console.log("purchased successfully");
					alert("item purchased");
				} else {
					console.log("error while adding data to the cart");
					//alert("invalid credentails");
				}
			})
			
			alert("User added to the community");
			$route.reload();
			

			


		}
		
		
		

});



app.controller('historyController', function($scope,$http) {



	$http({
		method : "GET",
		url : '/loadTweets'

	}).success(function(data) {
		//checking the response data for statusCode
		if (data.msg) {
			console.log("data received successfully");
			$scope.allproducts = data.msg;
			console.log("Result fetached is " + $scope.allproducts);
			console.log(JSON.stringify($scope.allproducts));


		}
		else
		{
			console.log("failed while sending data new product");
		}
		//Making a get call to the '/redirectToHomepage' API
	}).error(function(error) {
		console.log("failed inside products.js");
	});























	console.log("I am in send tweet controller");
	console.log("here" +$scope.tweet);


	$scope.postTweet = function() {

		console.log("inside the send tweet function");

		$http({
			method : "POST",
			url : '/sendTweet',
			data : {
				'tweet':$scope.tweet
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.msg) {
				console.log("Tweet inserted in mongo");
				console.log("printing all the tweets"+JSON.stringify(data.msg));
				$scope.allproducts = data.msg;




			}
			else
			{
				console.log("failed while sending data new product");
				console.log(data.msg);
				console.log("printing all the tweets"+JSON.stringify(data.msg));

			}
			//Making a get call to the '/redirectToHomepage' API
		}).error(function(error) {
			console.log("failed inside info.js");
		});
	};
});



app.controller('youradsController', function($scope,$http) {
	console.log("I am in yourads controller");
	//console.log("here" +$scope.status);
	//console.log("printing product name" + $scope.p_name);
	
		$http({
			method : "POST",
			url : '/yourads'
			
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data+ "oho");
			if (data.statusCode == 200) {
				console.log("data received successfully");
				$scope.allproducts = data.results;
				console.log("Result fetached is " + $scope.allproducts);
				console.log(JSON.stringify($scope.allproducts));
				}
			else
				{
				console.log("failed while sending data new product");
				}
				//Making a get call to the '/redirectToHomepage' API
		}).error(function(error) {
               console.log("failed inside info.js");
		});
		
});



app.controller('infoController', function($scope,$http) {
	

	
	
	console.log("I am in info controller");
	console.log("here" +$scope.Birthday);
	console.log("printing USER  contact number " + $scope.Contact);
	
	
	
	
	

	$http({
		method : "POST",
		url : '/info1'
		
	}).success(function(data) {
		//checking the response data for statusCode
		console.log(data+ "oho");
		if (data.statusCode == 200) {
			console.log("data received successfully");
			$scope.allproducts = data.results;
			console.log("Result fetached is " + $scope.allproducts);
			console.log(JSON.stringify($scope.allproducts));
			}
		else
			{
			console.log("failed while sending data new product");
			}
			//Making a get call to the '/redirectToHomepage' API
	}).error(function(error) {
           console.log("failed inside info.js");
	});
	
	
	
	
	
	
	

	$scope.sendMail = function(mail,message) {

		console.log("printing mail id"+mail);
		console.log("printing message"+message);

		$http({
			method : "POST",
			url : '/sendMail',
			data : {
				"to":mail,
				"message":message
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 200) {
				console.log("sent the data over server succssfully.");
				$scope.allproducts = data.results;
				console.log("Result fetached is " + $scope.allproducts);
				console.log(JSON.stringify("This is the data receved fom server"+$scope.allproducts));
				console.log(JSON.stringify($scope.allproducts));

			
			}
			else
				{
				console.log("failed while sending data new product");
				}
				//Making a get call to the '/redirectToHomepage' API
		}).error(function(error) {
               console.log("failed inside info.js");
		});
	};
});





