/**
 * Created by rohankankapurkar on 5/12/17.
 */

var mongo = require("./mongoConnection");


var mongoURL = "mongodb://rohan:rohan@cluste0-shard-00-00-fy76c.mongodb.net:27017,cluste0-shard-00-01-fy76c.mongodb.net:27017,cluste0-shard-00-02-fy76c.mongodb.net:27017/CMPE281?ssl=true&replicaSet=Cluste0-shard-0&authSource=admin";


//var mongoURL = "mongodb://cluste0-shard-00-00-fy76c.mongodb.net:27017,cluste0-shard-00-01-fy76c.mongodb.net:27017,cluste0-shard-00-02-fy76c.mongodb.net:27017/CMPE281?replicaSet=Cluste0-shard-0";
exports.sendTweet = function(req,res) //redirect function to the homepage
{

    console.log("I am inside node tweet ");

    console.log(req.session.email[0].email+ "I am inside tweet API");
    var tweet = req.param("tweet");

    var email = req.session.email[0].email;

    mongo.connect(mongoURL, function(err, db){
        console.log("inside coonect mongo function");
        var coll = mongo.collection('tweets');

        console.log("above mongo ");
        coll.insert({"email" : email, "tweet": tweet }, function(err, user){
            if (user) {
                console.log("Tweet added successfully");



                mongo.connect(mongoURL, function(){



                    var cursor = coll.find({}).sort({'_id':-1}).toArray(function(err, items) {
                            if (items)
                            {
                              console.log("printing the tweets here"+JSON.stringify(items));
                                res.code = 200;
                                res.value = "Successfully sent the buy items to the user";
                                res.json({msg: items});
                            }
                            else
                            {

                                console.log("Error while getting the tweets from mongo");
                            }
                        }
                    );
                });




                //res.json({msg: req.session.email[0].email});
            } else {
                console.log("returned false");
                res.code = 401;
                res.value = "Failed Login";
            }
        });

    });





};



exports.loadTweets = function(req,res) //redirect function to the homepage
{

    console.log("inside getting tweet api");
    mongo.connect(mongoURL, function(){

        var coll = mongo.collection('tweets');


        var cursor = coll.find({}).sort({'_id':-1}).toArray(function(err, items) {
                if (items)
                {
                    console.log("printing the tweets here"+JSON.stringify(items));
                    res.code = 200;
                    res.value = "Successfully sent the buy items to the user";
                    res.json({msg: items});
                }
                else
                {

                    console.log("Error while getting the tweets from mongo");
                }
            }
        );
    });





};



