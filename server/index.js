import twit from 'twit'
import path from 'path'
import express from 'express'
import cors from 'cors'
import {fileURLToPath} from 'url'
import {readFileSync} from 'fs'

const app = express()

//for creating the final json object of tweets to send to the front-end
let tweets = []
//for each users tweets as json objects in an array
let temp = []

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//create a file called 'users.json' and add two arrays for normal users and special users
const users = JSON.parse(readFileSync(path.join(__dirname, "public/users.json"), "utf8"))

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
		text: t.text.toString(),
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
}

//utilizes the 'twit' library to obtain tweets and adds them to the root doc 
const get_tweets = (USER, SPECIAL) => {
 	T.get('statuses/user_timeline', { 
 		screen_name: USER, 
 		count: 1, 
 		include_rts: false,
 		exclude_replies: SPECIAL,
 		trim_user: false
 	}, (err, data) => {
 		if (err) {console.log(err)}
 		else{
 			data.forEach(display_tweets)
			tweets.push(temp)
			temp = []
 		}
 	})
}

//excludes replies
const low_priority = (ACCOUNT) => {
 	get_tweets(ACCOUNT, true)
}

//includes replies
const high_priority = (ACCOUNT) => {
 	get_tweets(ACCOUNT, false)
}

//iterates through all of the users to obtain their tweets
users.normal.forEach(low_priority)
users.special.forEach(high_priority)

app.use(cors({
	origin: '*'
}))

//adds static files to server
app.use(express.static('./public'))

//runs html code on server
app.get('/', (req, res) => {
	res.send(JSON.stringify({tweets}))
})

app.listen(8000)
