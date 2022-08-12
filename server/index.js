import twit from 'twit'
import path from 'path'
import express from 'express'
import cors from 'cors'
import {fileURLToPath} from 'url'
import {readFileSync, writeFileSync} from 'fs'
import {addUser, removeUser} from './user.js'

const app = express()

//for creating the final json object of tweets to send to the front-end
let tweets = []
//for each users tweets as json objects in an array
let temp = []

//to check for duplicates
let usernames  = []

//unique id for each tweet
let tweet_id = 0

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let users = {users: []}

try{
	//create a file called 'users.json' and add two arrays for normal users and special users
	users = JSON.parse(readFileSync(path.join(__dirname, "public/users.json"), "utf8"))
}catch(err){
	writeFileSync(path.join(__dirname, "public/users.json"), JSON.stringify(users))
}

//create a file called 'credentials.json' and add all of your corresponding credentials
const cred = JSON.parse(readFileSync(path.join(__dirname, "public/credentials.json"), "utf8"))

const T = new twit({
	consumer_key:         cred.consumer_key,
	consumer_secret:      cred.consumer_secret,
	access_token:         cred.access_token,
	access_token_secret:  cred.access_token_secret
})

//outputs the tweets to the element object
const display_tweets = (t) => {

	let tweet = {
		profile_picture: t.user.profile_image_url.toString(),
		username: t.user.name.toString(),
		screen_name: t.user.screen_name,
		text: t.full_text.toString(),
		tweet_id: tweet_id,
		date_posted: t.created_at.substring(0, t.created_at.indexOf('+'))
	}

 	if (t.entities['media'] !== undefined){
 		tweet['img_flag'] = "true"
		tweet['images'] = []
 		t.extended_entities.media.map(p => {
 			tweet['images'].push(p.media_url_https.toString())
 		})
 	}else{
		tweet['img_flag'] = "false"
	}

	temp.push(tweet)
	tweet_id++
}

//utilizes the 'twit' library to obtain tweets and adds them to the root doc 
const get_tweets = async (USER, UPDATE) => {
 	await T.get('statuses/user_timeline', { 
 		screen_name: USER, 
 		count: 10, 
 		include_rts: false,
 		exclude_replies: true,
 		trim_user: false,
		tweet_mode: "extended"
 	}, (err, data) => {
 		if (err) {
			console.log(err)
		}else if (data[0] !== undefined){
			if (usernames.indexOf(USER) === -1){
				data.forEach(display_tweets)
				tweets.push(temp)
				usernames.push(USER)
				temp = []
			
				if (UPDATE){addUser(USER.toLowerCase())}
			}
 		}
 	})
}

//iterates through all of the users to obtain their tweets
users.users.forEach(get_tweets, false)

app.use(cors({
	origin: '*'
}))

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//runs html code on server
app.get('/', (req, res) => {
	res.send(JSON.stringify({tweets}))
})

app.post('/addUser', (req, res) => {
	get_tweets(req.body.user, true)

	res.end("")
})

app.post('/removeUser', (req, res) => {
	removeUser(req.body.user)

	res.end("")
})

app.listen(8000)
