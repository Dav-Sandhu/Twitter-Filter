# Twitter-Filter
For filtering twitter accounts for tweets only, simplified version of twitter.
To use: 
  1) run "npm install" in both the client and server folders to get all dependencies
  2) create a public folder in server
  3) Add 1 file to a public folder under server called "credentials.json"
  4) In the "credentials.json" file add the following:
  ```json
  {
  	"consumer_key":         "your_consumer_key",
	"consumer_secret":      "your_consumer_secret",
	"access_token":         "your_access_token",
	"access_token_secret":  "your_access_token_secret"
  }
 ```
  5) In the "users.json" file add two arrays, one called "special" and one called "normal" for special and normal users. special users show more information about each     user whereas normal users show normal amount of information.
  6) First run the server which should appear on port: 8000, then run the client which should appear on port: 3000
