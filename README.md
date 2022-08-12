# Twitter-Filter
For filtering twitter accounts for tweets only, simplified version of twitter.
To use: 
  1) Run "npm install" in both the client and server folders to get all dependencies
  2) Create a "public" folder within the server folder
  3) Add 1 file to the "public" folder called "credentials.json" which should contain your twitter api access keys from your developer account.
  4) If you do not have a developer account go to: https://developer.twitter.com/en/apply-for-access and create one, then generate your keys.
  5) In the "credentials.json" file add the following:
  ```json
  {
  "consumer_key":         "your_consumer_key", 
  "consumer_secret":      "your_consumer_secret", 
  "access_token":         "your_access_token", 
  "access_token_secret":  "your_access_token_secret"
  }
 ```
  6) Run the server using the "npm start" in the "server" folder.
  7) Run the client using the same command in the "client" folder, which will then take you to the website.
