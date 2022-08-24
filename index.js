// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
//need to parse the body (cjs)
let bodyParser = require('body-parser');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use(bodyParser.urlencoded({extended: false}));


/*
--USER STORIES--
1) A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)

2) A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT

3) A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }

4) Your project can handle dates that can be successfully parsed by new Date(date_string)

5) If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }

6) An empty date parameter should return the current time in a JSON object with a unix key

7) An empty date parameter should return the current time in a JSON object with a utc key
*/

app.get("/api/", function(req, res){
  let date = new Date();
  let unixTimestamp = date.getTime();
  let utcDate = date.toUTCString();

  res.json({
    unix: unixTimestamp,
    utc: utcDate
  })
});


app.get("/api/:date?", function(req, res){
  let dateStr = req.params.date;
  let unixTimestamp;
  let utcDate;
  let myJSON = {"unix":"", "utc":""};
  let date = new Date(dateStr);



  if(date != "Invalid Date"){
    unixTimestamp = date.getTime();
    myJSON.unix = unixTimestamp;
    utcDate = date.toUTCString();
    myJSON.utc = utcDate;

  }else if(dateStr && dateStr.length > 0){
    dateStr = parseInt(dateStr);
    let date = new Date(dateStr);
    if(date != "Invalid Date"){
      unixTimestamp = dateStr;
      myJSON.unix = unixTimestamp;
      utcDate = date.toUTCString();
      myJSON.utc = utcDate;
    }else{
      myJSON = {"error":"Invalid Date"};
    }
    
  }else{
    myJSON = {"error":"Invalid Date"};
  }


  res.json(myJSON);
});




