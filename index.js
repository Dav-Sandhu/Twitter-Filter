import http from 'http'
import twit from 'twit'
import path from 'path'

import {fileURLToPath} from 'url'
import {createFileSync, readFileSync, clearFile} from './fileHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const header = path.join(__dirname, "index.html")
const body = path.join(__dirname, "file.html")

//create a file called 'users.json' and add two arrays for normal users and special users
const users = JSON.parse(readFileSync(path.join(__dirname, "users.json"), "utf8"))

//create a file called 'credentials.json' and add all of your corresponding credentials
const cred = JSON.parse(readFileSync(path.join(__dirname, "credentials.json"), "utf8"))

const T = new twit({
	consumer_key:         cred.consumer_key,
	consumer_secret:      cred.consumer_secret,
	access_token:         cred.access_token,
	access_token_secret:  cred.access_token_secret
})

const display_tweets = (tweets) => {
	createFileSync("<div class='border'><div class='tweet'><h3 class='profile'> <img src='")
	createFileSync(tweets.user.profile_image_url)
	createFileSync("' class='profile_picture' />&nbsp" + tweets.user.name + '</h3>')
	createFileSync("<a>" + tweets.text + '</a><br>')

	if (tweets.entities['media'] !== undefined){
		tweets.extended_entities.media.map(p => {
			createFileSync("<img src='" + p.media_url_https)
			createFileSync("' class='images' width=200 height=200 />&nbsp")
		})
		createFileSync("<br>")
	}
	let date = tweets.created_at.substring(0, tweets.created_at.indexOf('+'))
	createFileSync("<div class='date'>" + date + "</div><br></div></div>")
}

const get_tweets = (USER, SPECIAL) => {
	T.get('statuses/user_timeline', { 
		screen_name: USER, 
		count: 5, 
		include_rts: false,
		exclude_replies: SPECIAL,
		trim_user: false
	}, (err, data) => {
		if (err) {console.log(err)}
		else{
			data.forEach(display_tweets)
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

clearFile()

users.normal.forEach(low_priority)
users.special.forEach(high_priority)

http.createServer((req, res) => {
	if (req.url === '/'){
		res.writeHead(200, {
			'Content-Type': 'text/html'
		})
		res.end(readFileSync(header) + readFileSync(body))
	}else if (req.url === '/tweet_styles.css'){
		res.writeHead(200, {
			'Content-Type': 'text/css'
		})

		res.end(readFileSync(path.join(__dirname, "tweet_styles.css"), 'utf8'))
	}
}).listen(3000)
