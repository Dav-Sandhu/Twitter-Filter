# Twitter-Filter
For filtering twitter accounts for tweets only, simplified version of twitter.
To use: 
  1) Make sure you have "node version 16.16.0" and "npm version 8.11.0" installed for reliability.
  2) Run "npm install" in both the client and server folders to get all dependencies
  3) Create a "public" folder within the server folder
  4) Add 1 file to the "public" folder called "credentials.json" which should contain your twitter api access keys from your developer account.
  5) If you do not have a developer account go to: https://developer.twitter.com/en/apply-for-access and create one, then generate your keys.
  6) In the "credentials.json" file add the following:
  ```json
  {
  "consumer_key":         "your_consumer_key", 
  "consumer_secret":      "your_consumer_secret", 
  "access_token":         "your_access_token", 
  "access_token_secret":  "your_access_token_secret"
  }
 ```
  7) Run the server using the "npm start" in the "server" folder.
  8) Run the client using the same command in the "client" folder, which will then take you to the website.
  9) The following should be your result:
  ![alt text](https://i.imgur.com/3dDsee1.png)
  10) You can then use the search to add users to your list...
  ![alt text](https://i.imgur.com/mcbgILu.png)
