// Aim: doing a NodeJS server - 1 million db insert using MongoDb database - check NodeJS stability -- by Mohee Jarada (Doha March 28, 2020):

// Run command with memory heap 6GB reserve to insert 1m db record this one is used: 
// $ node --max-old-space-size=6000 performance_final_code_nodejs_db_level_test_mohee_1million_recs.js 1000000

// Run command with memory heap 14GB reserve to insert 20m db record this one is used: 
// $ node --max-old-space-size=14000 performance_final_code_nodejs_db_level_test_mohee_1million_recs.js 20000000

// Original code from https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp and https://www.w3schools.com/nodejs/nodejs_mongodb_insert.asp

/* 
 Mohee: Additional JS node code resources for command line argument processing + heap memory performance increase, here are the URLs: 
https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
https://futurestud.io/tutorials/node-js-increase-the-memory-limit-for-your-process
*/

// Initialize MongoDB database driver:
var MongoClient = require('mongodb').MongoClient;

var url_db = "mongodb://localhost:27017/";
const db_name = "mohi_performance_testdb";
const db_table_name = "order_list";

// Important note: MongoDB waits until you have created a collection (table), with at least one document (record) before it actually creates the database (and collection).

// A collection in MongoDB is the same as a table in MySQL

/*
Important: In MongoDB, a collection is not created until it gets content!

MongoDB waits until you have inserted a document before it actually creates the collection.
*/

// A document in MongoDB is the same as a record in MySQL

function doDbInsertion(pDbo, pDbConnRef) {
	var myArgs = process.argv.slice(2); // skip first two arguments: node and JS script name
  	console.log('nodeJS: passed command line arguments: ' + myArgs)

  	var maxTry = parseInt(myArgs[0]); // 1 million db record to be inserted
  	var myobj = {};
  	var myobjArray = [];

  	for (var counter = 0; counter < maxTry; counter++) {  	  
    	// JSON structure or JS dictionary like in Python:
    	var myobj = {"_id": counter, order_id: "ord" + counter, product_type: "Mobile device" + counter, customer_name: "Mohee Jarada" + counter, zip_code: "1088" + counter, city: "Doha" + counter, country: "Qatar" + counter};
    	myobjArray.push(myobj);
   } // end for loop

/*
   for (var i = 0; i < myobjArray.length; i++) {
        console.log("_id = " + myobjArray[i]["_id"]);
   }
*/
   console.log("nodeJS: Done with for loop for filling the total JSON object structure of total records: " + maxTry);

   // Note: If you try to insert documents in a collection that do not exist, MongoDB will create the collection automatically.
   pDbo.collection(db_table_name).insertMany(myobjArray,  function(err, res) {
       if (err) throw err;
       console.log("nodeJS: Number of documents inserted into database is: " + res.insertedCount);
       // Close DB connection when all db transactions are finished
       pDbConnRef.close();
   });
} // end doDbInsertion())

// -------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------

MongoClient.connect(url_db, function(err, db) {
  if (err) throw err;

  var dbo = db.db(db_name);
  console.log("nodeJS: Database named " + db_name + " is created now in MongoDB!");
  
  // ************************************************************************************Delete/Drop DB collection if exists ********* Start
  dbo.collection(db_table_name).drop(function(err, delOK) {
    //if (err) throw err;
    if (delOK) {
    	console.log("nodeJS: MongoDB-Collection named: " + db_name + " is deleted/dropped!");
    	
  		dbo.createCollection(db_table_name, function(err, res) {
    	if (err) throw err;
    		console.log("nodeJS: DB table named " + db_table_name + " - Collection/DB Table is created inside MangoDB!");
    		
    		doDbInsertion(dbo, db);
  		}); 	
    } // end if
    else {
    	console.log("nodeJS: MongoDB-Collection named: " + db_name + " is NOT deleted/dropped! $$$$$$$$$$$$$$$$$$$$$$$$$$");
    	doDbInsertion(dbo, db);
    } // end else
  });
  // ********************************************************************************************************************************* End    
});
